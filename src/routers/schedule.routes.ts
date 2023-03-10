import { validatedBody } from "./../middlewares/verifyBody.middleware";
import { verifyAdmPerm } from "./../middlewares/verifyAdmPerm.middleware";
import { verifyToken } from "./../middlewares/verifyTokenMiddleware";
import {
  createScheduleController,
  listAllSchedulesByRealEstateController,
} from "./../controllers/schedules/schedules.controller";
import { Router } from "express";
import { scheduleSchema } from "../schemas/schedule.schemas";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  verifyToken,
  validatedBody(scheduleSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  verifyToken,
  verifyAdmPerm,
  listAllSchedulesByRealEstateController
);
