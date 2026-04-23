import * as z from "zod";

export const userDataSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .optional(),
  email: z.email().optional(),
});

export const userPasswordSchema = z.object({
  currentPassword: z.string().min(6, "Password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
