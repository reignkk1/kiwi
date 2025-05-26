import { create } from "zustand";
import { GenreType } from "../../types";

type ActiveGenreMenuStore = {
  activeMenu: GenreType;
  setActiveMenu: (genreMenu: ActiveGenreMenuStore["activeMenu"]) => void;
};

export const useActiveGenreMenuStore = create<ActiveGenreMenuStore>((set) => ({
  activeMenu: "all",
  setActiveMenu: (menu) => set(() => ({ activeMenu: menu })),
}));
