import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iReturnUsers } from "../../interfaces/users.interface";
import { returnMultipleUserSchema } from "../../schemas/users.schemas";

export const listUsersService = async (): Promise<iReturnUsers> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const users = returnMultipleUserSchema.parse(findUsers);

  return users;
};
