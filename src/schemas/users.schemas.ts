import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().min(4).max(20),
  admin: z.boolean().default(false),
});

export const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

export const returnMultipleUserSchema = returnUserSchema.array();

export const loginSchema = z.object({
  email: z.string().email().min(10).max(45),
  password: z.string().min(4).max(20),
});
