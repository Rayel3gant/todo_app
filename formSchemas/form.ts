import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export const signupFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  email: z.string().email("Invalid email format"),
});

export const todoFormSchema = z.object({
  title: z.string().min(8, "Minimum 8 characters required"),
  date: z.date(),
});
