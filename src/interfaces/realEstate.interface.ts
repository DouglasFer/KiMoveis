import { simpleRealEstateReturnSchema } from "./../schemas/realEstate.schemas";
import { RealEstate } from "./../entities/realEstate.entity";
import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  realEstateSchema,
  returnMultRealEstate,
  returnRealEstateByCategory,
  returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

export type iRealEstate = z.infer<typeof realEstateSchema>;
export type iReturnRealEstate = z.infer<typeof returnRealEstateSchema>;
export type iReturnALlRealEstate = z.infer<typeof returnMultRealEstate>;

export type iReturnRealEstateByCategory = z.infer<
  typeof returnRealEstateByCategory
>;

export type iPartialRealEstate = DeepPartial<RealEstate>;
