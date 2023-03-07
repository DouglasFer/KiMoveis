import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUserReturn, iUserUpdate } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schemas";

export const updateUserService = async (
  newUserData: iUserUpdate,
  idUser: number
): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};
