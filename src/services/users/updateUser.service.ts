import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { iUserReturn, iUserUpdate } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schemas";

export const updateUserService = async (
  newUserData: iUserUpdate,
  idUser: number,
  isAdmin: boolean
): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  if (!oldUserData?.admin && newUserData.admin !== false) {
    newUserData.admin = false;
  }

  if (!isAdmin && oldUserData?.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};
