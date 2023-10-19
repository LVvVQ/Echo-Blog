import * as z from "zod"

export const userAuthSchema = z.object({
  username: z.string().min(2).max(16),
  password: z.string().min(6),
})

export const signUpSchema = z.object({
  username: z.string().min(2).max(16),
  password: z.string().min(6),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})
