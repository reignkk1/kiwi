import { create } from "zustand";

type IsActivePlayerStore = {
  isActivePlayer: boolean;
  setIsActivePlayer: (
    activePlayer: IsActivePlayerStore["isActivePlayer"]
  ) => void;
};

export const useIsActivePlayerStore = create<IsActivePlayerStore>((set) => ({
  isActivePlayer: true,
  setIsActivePlayer: (isActivePlayer) => set({ isActivePlayer }),
}));
