import {
  addressSchema,
  returnAddressSchema,
  returnAllListRealEstate,
  returnCreateRealEstate,
} from "./../schemas/realEstate.schemas";

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
export type iAddress = z.infer<typeof addressSchema>;

export type iCreateRealEstateReturn = z.infer<typeof returnCreateRealEstate>;

export type iReturnRealEstateByCategory = z.infer<
  typeof returnRealEstateByCategory
>;

export type iReturnAllListRealEstate = z.infer<typeof returnAllListRealEstate>;
