import { requests } from "@/lib/requests";
import { signUpSchema, userAuthSchema } from "@/lib/validations/auth";
import { LoginResponse, Response } from "@/types";
import { z } from "zod";

type FormData = z.infer<typeof userAuthSchema | typeof signUpSchema>;

export async function login(data: FormData) {
  return await requests.post<any, Response<LoginResponse>>("/api/auth/login", data);
}

export async function signUp(data: FormData) {
  return await requests.post<any, Response<LoginResponse>>("/api/auth/signup", data);
}
