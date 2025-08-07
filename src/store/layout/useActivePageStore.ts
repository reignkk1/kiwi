import { create } from "zustand";
import { Pages } from "../../types";

const pages: Pages[] = ["home", "music", "player", "search", "drawer"];

const initialState = Object.fromEntries(
  pages.map((page) => [page, false])
) as Record<Pages, boolean>;

type ActivePageStore = {
  activePage: typeof initialState;
  setActivePage: (activePage: Pages) => void;
};

export const useActivePageStore = create<ActivePageStore>((set) => ({
  activePage: initialState,
  setActivePage: (activePage) =>
    set({
      activePage: { ...initialState, [activePage]: true },
    }),
}));
