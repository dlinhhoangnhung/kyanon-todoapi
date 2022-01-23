import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Register
router.post("/sign-up", AuthController.signUp);

//Login 
router.post("/sign-in", AuthController.signIn);

export default router;
