import { create } from "zustand";

interface IsPlayerMenuStore {
  isPlayerMenu: boolean;
  openPlayerMenu: () => void;
  closePlayerMenu: () => void;
}

interface IsLyricsClickedStore {
  isLyricsClicked: boolean;
  clickLyrics: () => void;
}

export interface IsExpandLyricsStore {
  isExpandLyrics: boolean;
  setIsExpandLyrics: (
    isExpandLyrics: IsExpandLyricsStore["isExpandLyrics"]
  ) => void;
  toggleExpandLyrics: () => void;
}

export const createIsPlayerMenuStore = create<IsPlayerMenuStore>((set) => ({
  isPlayerMenu: false,
  openPlayerMenu: () => set(() => ({ isPlayerMenu: true })),
  closePlayerMenu: () => set(() => ({ isPlayerMenu: false })),
}));

// 가사 클릭 했을 때
export const createIsLyricsClickedStore = create<IsLyricsClickedStore>(
  (set) => ({
    isLyricsClicked: false,
    clickLyrics: () => set(() => ({ isLyricsClicked: true })),
  })
);

// 가사 클릭시 확대
export const createIsExpandLyricsStore = create<IsExpandLyricsStore>((set) => ({
  isExpandLyrics: false,
  setIsExpandLyrics: (isExpandLyrics) => set(() => ({ isExpandLyrics })),
  toggleExpandLyrics: () =>
    set((state) => ({ isExpandLyrics: !state.isExpandLyrics })),
}));
