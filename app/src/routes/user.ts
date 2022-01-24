import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all users - API 8
router.get("/", checkJwt, UserController.listAll)

export default router;
