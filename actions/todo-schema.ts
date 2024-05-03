import { z } from "zod";

export const todoSchema = z.object({
    text: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
  })