import { create } from "zustand";

type IsPlayerMenuStore = {
  isPlayerMenu: boolean;
  openPlayerMenu: () => void;
  closePlayerMenu: () => void;
};

export const useIsPlayerMenuStore = create<IsPlayerMenuStore>((set) => ({
  isPlayerMenu: false,
  openPlayerMenu: () => set(() => ({ isPlayerMenu: true })),
  closePlayerMenu: () => set(() => ({ isPlayerMenu: false })),
}));
