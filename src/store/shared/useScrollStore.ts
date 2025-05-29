import { create } from "zustand";

type MusicScrollStore = {
  scrollTop: number;
  setScrollTop: (scrollTop: MusicScrollStore["scrollTop"]) => void;
};

export const useScrollStore = create<MusicScrollStore>((set) => ({
  scrollTop: 0,
  setScrollTop: (scrollTop) => set({ scrollTop }),
}));
