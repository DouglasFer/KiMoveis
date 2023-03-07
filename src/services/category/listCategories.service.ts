import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iReturnCategory } from "../../interfaces/category.interface";
import { returnMultCategorySchema } from "../../schemas/category.schema";

export const listCategoriesService = async (): Promise<iReturnCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategories: Array<Category> = await categoryRepository.find();

  if (!findCategories) {
    throw new AppError("Category not found");
  }

  const categories = returnMultCategorySchema.parse(findCategories);

  return categories;
};
