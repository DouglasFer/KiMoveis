import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iReturnALlRealEstate } from "../../interfaces/realEstate.interface";

export const listAllRealEstateService =
  async (): Promise<iReturnALlRealEstate> => {
    const realEstateRepository: Repository<RealEstate> =
      AppDataSource.getRepository(RealEstate);

    const findRealEstate = await realEstateRepository.find({
      relations: {
        address: true,
      },
    });

    return findRealEstate;
  };
