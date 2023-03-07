import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category, User } from "../entities";
import { AppError } from "../errors";

export const foundUserExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: parseInt(request.params.id),
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export const verifyUserExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (!request.body.email) {
    return next();
  }

  const findUser = await userRepository.findOne({
    where: {
      email: request.body.email,
    },
  });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export const verifyCategoryExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (!request.body.name) {
    return next();
  }

  const findCategory = await categoryRepository.findOne({
    where: {
      name: request.body.name,
    },
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
