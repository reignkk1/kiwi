import { create } from "zustand";

type SeekStore = {
  seekTo: number | null;
  seeking: boolean;
  seekingValue: number;
  setSeekTo: (seekTo: SeekStore["seekTo"]) => void;
  setSeeking: (seeking: SeekStore["seeking"]) => void;
  setSeekingValue: (seekingValue: SeekStore["seekingValue"]) => void;
};

export const useSeekStore = create<SeekStore>((set) => ({
  seekTo: null,
  seeking: false,
  seekingValue: 0,
  setSeekTo: (seekTo) => set({ seekTo }),
  setSeeking: (seeking) => set({ seeking }),
  setSeekingValue: (seekingValue) => set({ seekingValue }),
}));
