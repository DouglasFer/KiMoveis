import { listAllRealEstateService } from "./../../services/realEstate/listAllRealEstate.service";
import { Request, Response } from "express";
import { iRealEstate } from "../../interfaces/realEstate.interface";
import { createRealEstateService } from "../../services/realEstate/createRealEstate.service";

export const createRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstate = request.body;

  const newRealEstate = await createRealEstateService(
    realEstate,
    realEstate.address
  );

  return response.status(201).json(newRealEstate);
};

export const listAllRealEstateController = async (
  request: Request,
  response: Response
) => {
  const allRealEstate = await listAllRealEstateService();

  return response.json(allRealEstate);
};
