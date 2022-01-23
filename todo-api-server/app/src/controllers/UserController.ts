import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../entity/User";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const users = await getRepository(User).find({
        select: ["id", "username", "fullName"],
      });
      res.send(users);
    } catch (error) {
      res.status(400).send("Happen error, check and try again. " + error);
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    try {
      const user = await getRepository(User).findOneOrFail(req.params.id, {
        select: ["id", "username", "fullName"],
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send("Happen error, check and try again. " + error);
    }
  };
  
}

export default UserController;
