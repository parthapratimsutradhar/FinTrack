import { z } from "zod";

// -----------------------
// Register Schema
// -----------------------
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// -----------------------
// Login Schema
// -----------------------
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// -----------------------
// Update Profile Schema
// -----------------------
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email({ message: "Invalid email" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1, { message: "User ID is required" }),
  }),
});
