import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type userNameStore = {
  userName: string;
  setUserName: (name: userNameStore["userName"]) => void;
};

export const useUserNameStore = create(
  persist<userNameStore>(
    (set) => ({
      userName: "",
      setUserName: (name) => set(() => ({ userName: name.slice(0, 4) })),
    }),
    {
      name: "userName",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
