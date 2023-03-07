import { z } from "zod";
import { categorySchema, returnCategorySchema } from "./category.schema";

export const addressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().nullish(),
  city: z.string(),
  state: z.string().max(2),
});

export const returnAdressSchema = addressSchema.extend({
  id: z.number().optional(),
});

export const realEstateSchema = z.object({
  sold: z.boolean().default(false),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: returnAdressSchema,
  categoryId: z.number().optional(),
});

export const returnRealEstateSchema = realEstateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const returnMultRealEstate = returnRealEstateSchema.array();

export const simpleRealEstateSchema = returnRealEstateSchema.omit({
  address: true,
  categoryId: true,
});

export const simpleRealEstateReturnSchema = returnRealEstateSchema.omit({
  categoryId: true,
});

export const returnRealEstateByCategory = returnCategorySchema.extend({
  realEstate: simpleRealEstateSchema.array(),
});

export const testTyp = returnRealEstateSchema.extend({
  category: returnCategorySchema,
});
