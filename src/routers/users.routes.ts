import { verifyToken } from "./../middlewares/verifyTokenMiddleware";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "./../controllers/users/user.controller";
import { Router } from "express";
import { validatedBody } from "../middlewares/verifyBody.middleware";

import {
  foundUserExist,
  verifyUserExist,
} from "../middlewares/verifyExists.middleware";
import { userSchema } from "../schemas/users.schemas";
import { verifyAdmPerm } from "../middlewares/verifyAdmPerm.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyUserExist,
  validatedBody(userSchema),
  createUserController
);
userRoutes.get("", verifyToken, verifyAdmPerm, listUserController);
userRoutes.patch(
  "/:id",
  verifyToken,
  verifyUserExist,
  foundUserExist,
  updateUserController
);
userRoutes.delete("/:id", verifyToken, foundUserExist, deleteUserController);
