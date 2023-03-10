import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";

export const createScheduleService = async (
  scheduleData: any,
  idUser: number
) => {
  const scheduleRespository = AppDataSource.getRepository(Schedule);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const userRepository = AppDataSource.getRepository(User);

  const realEstate = await realEstateRepository.findOne({
    where: {
      id: scheduleData.realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const date = new Date(scheduleData.date).toString();
  const hour = scheduleData.hour;

  const newDate = date.split(" ")[0];

  const newHour = parseInt(hour.split(":")[0]);

  if (newHour < 8 || newHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  if (newDate === "Sat" || newDate === "Sun") {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const verifySchedule = await scheduleRespository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.userId = :userId", { userId: idUser })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .getCount();

  if (verifySchedule > 0) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verifyScheduleRealEstate = await scheduleRespository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .getOne();

  if (verifyScheduleRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const newSchedules = scheduleRespository.create({
    ...scheduleData,
    user,
    realEstate,
  });

  await scheduleRespository.save(newSchedules);

  return newSchedules;
};
