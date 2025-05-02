import { create } from "zustand";

type IsLyricsClickedStore = {
  isLyricsClicked: boolean;
  clickLyrics: () => void;
  unclickedLyrics: () => void;
};

export const useIsLyricsClickedStore = create<IsLyricsClickedStore>((set) => ({
  isLyricsClicked: false,
  clickLyrics: () => set(() => ({ isLyricsClicked: true })),
  unclickedLyrics: () => set(() => ({ isLyricsClicked: false })),
}));
