import { create } from "zustand";

type SeekStore = {
  seekTo: number | null;
  seeking: boolean;
  setSeekTo: (time: SeekStore["seekTo"]) => void;
  setSeeking: (seeking: SeekStore["seeking"]) => void;
};

export const useSeekStore = create<SeekStore>((set) => ({
  seekTo: null,
  seeking: false,
  setSeekTo: (time) => set({ seekTo: time }),
  setSeeking: (seeking) => set({ seeking }),
}));
