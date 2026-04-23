import * as z from "zod";

export const registerSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
