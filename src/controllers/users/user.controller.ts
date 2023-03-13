import { createUserService } from "./../../services/users/createUser.service";
import { Request, Response } from "express";
import { iUser, iUserUpdate } from "../../interfaces/users.interface";
import { deleteUserService } from "../../services/users/deleteUser.service";
import { listUsersService } from "../../services/users/listUsers.service";
import { updateUserService } from "../../services/users/updateUser.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: iUser = request.body;
  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

export const listUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService();

  return response.json(users);
};

export const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: iUserUpdate = request.body;
  const idUser = parseInt(request.params.id);

  const admin = request.user.admin;

  const updatedUser = await updateUserService(userData, idUser, admin);

  return response.json(updatedUser);
};
export const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const admin = request.user.admin;
  await deleteUserService(parseInt(request.params.id), admin);

  return response.status(204).send();
};
