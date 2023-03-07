import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  loginSchema,
  returnMultipleUserSchema,
  returnUserSchema,
  userSchema,
} from "../schemas/users.schemas";

export type iUser = z.infer<typeof userSchema>;
export type iUserReturn = z.infer<typeof returnUserSchema>;
export type iUserUpdate = DeepPartial<iUser>;
export type iReturnUsers = z.infer<typeof returnMultipleUserSchema>;

export type iLogin = z.infer<typeof loginSchema>;
