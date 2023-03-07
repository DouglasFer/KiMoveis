import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  iCategory,
  iReturnCreateCategory,
} from "../../interfaces/category.interface";
import { returnCategorySchema } from "../../schemas/category.schema";

export const createCategoryService = async (
  categoryData: iCategory
): Promise<iReturnCreateCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = returnCategorySchema.parse(category);

  return newCategory;
};
