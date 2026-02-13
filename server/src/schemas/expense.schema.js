import { z } from "zod";


// Add Expense
export const addExpenseSchema = z.object({
  body: z.object({
    amount: z.number().positive({ message: "Amount must be positive" }),
    category: z.string().min(1, { message: "Category is required" }),
    description: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// Update Expense
export const updateExpenseSchema = z.object({
  body: z.object({
    amount: z.number().positive({ message: "Amount must be positive" }).optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    date: z.string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date",
      }),
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1, { message: "Expense ID is required" }),
  }),
});