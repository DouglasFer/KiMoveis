import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

export const listSchedulesByRealEstate = async (id: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.findOne({
    where: { id: id },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return findRealEstate;
};
