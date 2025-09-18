import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PlayListStore = {
  category: "playList";
  playListIds: Array<number>;
  playingIndex: number | null;
  setPlayListIds: (playList: PlayListStore["playListIds"]) => void;
  setPlayingIndex: (playingIndex: PlayListStore["playingIndex"]) => void;
};

export const usePlayListStore = create(
  persist<PlayListStore>(
    (set) => ({
      category: "playList",
      playListIds: [],
      playingIndex: null,
      setPlayListIds: (playListIds) => set({ playListIds }),
      setPlayingIndex: (playingIndex) => set({ playingIndex }),
    }),
    {
      name: "playList",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
