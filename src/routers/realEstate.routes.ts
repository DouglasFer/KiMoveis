import { listAllRealEstateController } from "./../controllers/realEstate/realEstate.controller";
import { verifyAdmPerm } from "./../middlewares/verifyAdmPerm.middleware";
import { verifyToken } from "./../middlewares/verifyTokenMiddleware";
import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstate/realEstate.controller";
import { validatedBody } from "../middlewares/verifyBody.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyToken,
  verifyAdmPerm,
  validatedBody(realEstateSchema),
  createRealEstateController
);
realEstateRoutes.get("", listAllRealEstateController);
