import { z } from "zod";

//  Signup schema
export const signupSchema = z.object({
 name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});


// login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//  Job schema
export const jobSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  company: z.string().min(2, "Company name is too short"),
  location: z.string().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;

