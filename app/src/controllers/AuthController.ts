import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  // API 1
  static signUp = async (req: Request, res: Response) => {
    try {
      let { username, password, fullName } = req.body;
      let user = new User();
      user.username = username;
      user.password = password;
      user.fullName = fullName;

      //Hash the password, to securely store on DB
      user.hashPassword();
      await getRepository(User).save(user);
      res.status(201).send("Register is success");
    } catch (e) {
      res.status(400).send("Username have been used or another error. " +e);
      return;
    }
  };

  static signIn = async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;
      if (!(username && password)) {
        res.status(400).send();
      }

      let user = await getRepository(User).findOneOrFail({
        where: { username },
      });

      //Check if encrypted password match
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send("Password incorrect");
        return;
      }

      //Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: "3h" }
      ).toString();

      let result = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        token: token,
      };

      //Send the jwt in the response
      res.status(200).json({
        ...result,
        message: "Succeed login.",
        success: true,
      });
    } catch (err) {
      res.status(400).send("Username not found, check and try again. ");
    }
  };
}
export default AuthController;
