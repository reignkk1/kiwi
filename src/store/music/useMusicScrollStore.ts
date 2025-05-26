import { create } from "zustand";

type MusicScrollStore = {
  scrollTop: number;
  setScrollTop: (scrollTop: MusicScrollStore["scrollTop"]) => void;
};

export const useMusicScrollStore = create<MusicScrollStore>((set) => ({
  scrollTop: 0,
  setScrollTop: (scrollTop) => set({ scrollTop }),
}));
