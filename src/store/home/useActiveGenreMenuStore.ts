import { create } from "zustand";

type GenreMenu = "all" | "ballad" | "indie" | "hiphop";

type ActiveGenreMenuStore = {
  activeMenu: GenreMenu;
  setActiveMenu: (genreMenu: ActiveGenreMenuStore["activeMenu"]) => void;
};

export const useActiveGenreMenuStore = create<ActiveGenreMenuStore>((set) => ({
  activeMenu: "all",
  setActiveMenu: (menu) => set(() => ({ activeMenu: menu })),
}));
