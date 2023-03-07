import { iLogin } from "../../interfaces/users.interface";
import { createLoginService } from "../../services/users/loginUser.service";
import { Request, Response } from "express";

export const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: iLogin = request.body;

  const token = await createLoginService(loginData);

  return response.json({
    token: token,
  });
};
