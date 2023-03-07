import { Category } from "../../entities/category.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iReturnRealEstateByCategory } from "../../interfaces/realEstate.interface";
import { returnRealEstateByCategory } from "../../schemas/realEstate.schemas";
import { AppError } from "../../errors";

export const listRealEstateByCategoryService = async (
  idCategory: any
): Promise<iReturnRealEstateByCategory> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const findCategoriesRealEstate = await realEstateRepository.find({
    where: {
      category: idCategory,
    },
  });

  const responseRealEstateByCategory = {
    ...findCategory,
    realEstate: findCategoriesRealEstate,
  };

  const categoriesByRealEstate = returnRealEstateByCategory.parse(
    responseRealEstateByCategory
  );

  return categoriesByRealEstate;
};
