import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/createSchedules.service";
import { listSchedulesByRealEstate } from "../../services/schedules/listSchedules.service";

export const createScheduleController = async (
  request: Request,
  response: Response
) => {
  const schedule = request.body;
  const idUser = request.user.id;

  await createScheduleService(schedule, idUser);

  return response.status(201).json({ message: "Schedule created" });
};

export const listAllSchedulesByRealEstateController = async (
  request: Request,
  response: Response
) => {
  const id = parseInt(request.params.id);

  const returnAllList = await listSchedulesByRealEstate(id);

  return response.json(returnAllList);
};
