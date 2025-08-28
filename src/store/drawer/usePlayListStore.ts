import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PlayListStore = {
  playList: Array<number>;
  setPlayList: (playList: PlayListStore["playList"]) => void;
};

export const usePlayListStore = create(
  persist<PlayListStore>(
    (set) => ({
      playList: [],
      setPlayList: (playList) => set({ playList }),
    }),
    {
      name: "playList",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
