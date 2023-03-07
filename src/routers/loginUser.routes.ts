import { Router } from "express";
import { loginController } from "../controllers/login/loginUser.controller";
import { verifyUserExist } from "../middlewares/verifyExists.middleware";

export const loginRoutes: Router = Router();

loginRoutes.post("", loginController);
