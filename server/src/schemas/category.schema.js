import { z } from "zod";


export const addCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Category name is required" }),
    type: z.enum(["income", "expense"], { message: "Type must be 'income' or 'expense'" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
