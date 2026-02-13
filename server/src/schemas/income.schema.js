import { z } from "zod";


// Add Income
export const addIncomeSchema = z.object({
  body: z.object({
    amount: z.number().positive({ message: "Amount must be positive" }),
    source: z.string().min(1, { message: "Source is required" }),
    description: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// Update Income
export const updateIncomeSchema = z.object({
  body: z.object({
    amount: z.number().positive({ message: "Amount must be positive" }).optional(),
    source: z.string().optional(),
    description: z.string().optional(),
    date: z.string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date",
      }),
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1, { message: "Income ID is required" }),
  }),
});
