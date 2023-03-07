import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const verifyAdmPerm = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authenticatedUser = request.user;

  if (!authenticatedUser.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
