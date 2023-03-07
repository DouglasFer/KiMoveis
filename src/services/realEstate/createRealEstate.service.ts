import { returnCreateRealEstate } from "./../../schemas/realEstate.schemas";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { iReturnRealEstate } from "../../interfaces/realEstate.interface";
import { AppError } from "../../errors";

export const createRealEstateService = async (
  realEstateData: any,
  addressData: any
): Promise<iReturnRealEstate> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const addressRepository = AppDataSource.getRepository(Address);

  const categoryData = realEstateData.categoryId;

  const category = await categoryRepository.findOne({
    where: { id: categoryData },
  });

  if (!category) {
    throw new AppError("Category not exist");
  }

  const verifyAddress = await addressRepository.findOne({
    where: {
      street: addressData.street,
    },
  });

  if (verifyAddress) {
    throw new AppError("Address already exists", 409);
  }

  const address = addressRepository.create(addressData);

  await addressRepository.save(address);
  const realEstate = realEstateRepository.create({
    ...realEstateData,
    address: address,
    category: category,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate = returnCreateRealEstate.parse(realEstate);

  return newRealEstate;
};
