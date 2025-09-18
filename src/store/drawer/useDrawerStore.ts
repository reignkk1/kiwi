import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DrawerStore = {
  category: "drawer";
  playListIds: Record<string, Array<number>>;
  playingIndex: number | null;
  currentPlaylist: string;
  setPlayListIds: (playList: DrawerStore["playListIds"]) => void;
  setPlayingIndex: (playingIndex: DrawerStore["playingIndex"]) => void;
  setCurrentPlaylist: (playingIndex: DrawerStore["currentPlaylist"]) => void;
};

export const useDrawerStore = create(
  persist<DrawerStore>(
    (set) => ({
      category: "drawer",
      playListIds: {},
      currentPlaylist: "",
      playingIndex: null,
      setPlayListIds: (playListIds) => set({ playListIds }),
      setPlayingIndex: (playingIndex) => set({ playingIndex }),
      setCurrentPlaylist: (currentPlaylist) => set({ currentPlaylist }),
    }),
    {
      name: "musicDrawer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
