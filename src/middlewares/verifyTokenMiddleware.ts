import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "dotenv/config";

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  let token = request.headers.authorization;
  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    request.user = {
      id: parseInt(decoded.sub),
      admin: decoded.admin,
    };
  });
  return next();
};
