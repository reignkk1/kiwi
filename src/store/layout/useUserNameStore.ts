import { create } from "zustand";

type userNameStore = {
  userName: string;
  setUserName: (name: userNameStore["userName"]) => void;
};

export const useUserNameStore = create<userNameStore>((set) => ({
  userName: "",
  setUserName: (name) => set(() => ({ userName: name.slice(0, 4) })),
}));
