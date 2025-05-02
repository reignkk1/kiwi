import { create } from "zustand";

type IsExpandLyricsStore = {
  isExpandLyrics: boolean;
  setIsExpandLyrics: (
    isExpandLyrics: IsExpandLyricsStore["isExpandLyrics"]
  ) => void;
  toggleExpandLyrics: () => void;
};

export const useIsExpandLyricsStore = create<IsExpandLyricsStore>((set) => ({
  isExpandLyrics: false,
  setIsExpandLyrics: (isExpandLyrics) => set(() => ({ isExpandLyrics })),
  toggleExpandLyrics: () =>
    set((state) => ({ isExpandLyrics: !state.isExpandLyrics })),
}));
