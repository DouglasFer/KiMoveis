import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryByRealEstateController,
} from "../controllers/category/category.controller";
import { verifyAdmPerm } from "../middlewares/verifyAdmPerm.middleware";
import { verifyCategoryExist } from "../middlewares/verifyExists.middleware";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";

export const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  verifyToken,
  verifyAdmPerm,
  verifyCategoryExist,
  createCategoryController
);

categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/realEstate", listCategoryByRealEstateController);
