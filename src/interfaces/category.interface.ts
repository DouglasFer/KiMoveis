import { z } from "zod";
import {
  categorySchema,
  returnCategorySchema,
  returnMultCategorySchema,
} from "../schemas/category.schema";

export type iCategory = z.infer<typeof categorySchema>;
export type iReturnCategory = z.infer<typeof returnMultCategorySchema>;

export type iReturnCreateCategory = z.infer<typeof returnCategorySchema>;
