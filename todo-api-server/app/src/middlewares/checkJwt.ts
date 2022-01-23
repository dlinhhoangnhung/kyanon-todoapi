import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json("Unauthorize");
      return;
    }
    const token = authorization.replace("Bearer", "").trim();
    await jwt.verify(token, config.jwtSecret, (err: any, user: any) => {
      if (err) {
        res.status(403).json("Token invalid!");
        return false;
      }

      req.user = user; 
      next();
    });
  } catch {
    res.status(401).json("Authorize failed. Try again");
    return;
  }
};
