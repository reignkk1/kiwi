import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DrawerStore = {
  category: "playList" | "drawer" | null;
  playListIds: Array<number>;
  playingIndex: number | null;
  setPlayListIds: (playList: DrawerStore["playListIds"]) => void;
  setPlayingIndex: (playingIndex: DrawerStore["playingIndex"]) => void;
};

export const useDrawerStore = create(
  persist<DrawerStore>(
    (set) => ({
      category: "drawer",
      playListIds: [],
      playingIndex: null,
      setPlayListIds: (playListIds) => set({ playListIds }),
      setPlayingIndex: (playingIndex) => set({ playingIndex }),
    }),
    {
      name: "musicDrawer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
