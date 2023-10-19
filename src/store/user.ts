import { reqUserInfo } from "@/api/user";
import { User } from "@/types";
import { create } from "zustand";

interface UserState {
  user: User;
  getUserInfo: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {} as User,
  getUserInfo: async () => {
    const res = await reqUserInfo();
    if (res.code === 200) {
      set({ user: res.data });
    }
  },
}));
