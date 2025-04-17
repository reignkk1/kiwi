import { create } from "zustand";

interface IsPlayerMenuStore {
  isPlayerMenu: boolean;
  openPlayerMenu: () => void;
  closePlayerMenu: () => void;
}

interface IsLyricsClickedStore {
  isLyricsClicked: boolean;
  clickLyrics: () => void;
  unclickedLyrics: () => void;
}

interface IsExpandLyricsStore {
  isExpandLyrics: boolean;
  setIsExpandLyrics: (
    isExpandLyrics: IsExpandLyricsStore["isExpandLyrics"]
  ) => void;
  toggleExpandLyrics: () => void;
}

interface IsShuffleStore {
  isShuffle: boolean;
  toggleShuffle: () => void;
}

interface IsRepeatStore {
  isRepeat: boolean;
  toggleRepeat: () => void;
}

export const createIsPlayerMenuStore = create<IsPlayerMenuStore>((set) => ({
  isPlayerMenu: false,
  openPlayerMenu: () => set(() => ({ isPlayerMenu: true })),
  closePlayerMenu: () => set(() => ({ isPlayerMenu: false })),
}));

export const createIsLyricsClickedStore = create<IsLyricsClickedStore>(
  (set) => ({
    isLyricsClicked: false,
    clickLyrics: () => set(() => ({ isLyricsClicked: true })),
    unclickedLyrics: () => set(() => ({ isLyricsClicked: false })),
  })
);

export const createIsExpandLyricsStore = create<IsExpandLyricsStore>((set) => ({
  isExpandLyrics: false,
  setIsExpandLyrics: (isExpandLyrics) => set(() => ({ isExpandLyrics })),
  toggleExpandLyrics: () =>
    set((state) => ({ isExpandLyrics: !state.isExpandLyrics })),
}));

// 오디오 상태로
export const createIsShuffleStore = create<IsShuffleStore>((set) => ({
  isShuffle: false,
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
}));

export const createIsRepeatStore = create<IsRepeatStore>((set) => ({
  isRepeat: false,
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
}));
