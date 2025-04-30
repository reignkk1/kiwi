import { create } from "zustand";

const initialState = {
  home: false,
  search: false,
  storage: false,
  player: false,
};

type ActivePageStore = {
  activePage: typeof initialState;
  setActivePage: (activePage: keyof typeof initialState) => void;
};

export const useActivePageStore = create<ActivePageStore>((set) => ({
  activePage: initialState,
  setActivePage: (activePage) =>
    set({
      activePage: { ...initialState, [activePage]: true },
    }),
}));
