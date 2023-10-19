import { login, signUp } from "@/api/auth";
import { signUpSchema, userAuthSchema } from "@/lib/validations/auth";
import { Response, LoginResponse } from "@/types";
import { z } from "zod";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type FormData = z.infer<typeof userAuthSchema | typeof signUpSchema>;

interface AuthState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  login: (data: FormData) => Promise<Response<LoginResponse>>;
  logout: () => void;
  signUp: (data: FormData) => Promise<Response<LoginResponse>>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: "",
        setAccessToken: (accessToken: string) => set({ accessToken }),
        refreshToken: "",
        setRefreshToken: (refreshToken: string) => set({ refreshToken }),
        login: async (data: FormData) => {
          const res = await login(data);
          if (res.code === 200) {
            set({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            });
          }
          return res;
        },
        logout: () => {
          set({ accessToken: "", refreshToken: "" });
          localStorage.removeItem("token");
        },
        signUp: async (data: FormData) => {
          const res = await signUp(data);
          return res;
        },
      }),
      { name: "token" },
    ),
  ),
);
