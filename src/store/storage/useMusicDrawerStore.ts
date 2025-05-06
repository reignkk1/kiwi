import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MusicDrawerStore = {
  musicDrawer: Array<number>;
  setMusicDrawer: (musicDrawer: MusicDrawerStore["musicDrawer"]) => void;
};

export const useMusicDrawerStore = create(
  persist<MusicDrawerStore>(
    (set) => ({
      musicDrawer: [],
      setMusicDrawer: (musicDrawer) => set({ musicDrawer }),
    }),
    {
      name: "musicDrawer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
