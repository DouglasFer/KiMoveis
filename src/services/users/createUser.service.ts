import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUser, iUserReturn } from "../../interfaces/users.interface";
import { returnUserSchema } from "./../../schemas/users.schemas";

export const createUserService = async (
  userData: iUser
): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
