import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const deleteUserService = async (idUser: number, admin: boolean) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  await userRepository.softRemove(user!);
};
