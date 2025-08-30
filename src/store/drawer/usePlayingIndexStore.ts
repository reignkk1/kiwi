import { create } from "zustand";

type PlayingIndexStore = {
  playingIndex: number;
  setPlayingIndex: (number: PlayingIndexStore["playingIndex"]) => void;
};

export const usePlayingIndexStore = create<PlayingIndexStore>((set) => ({
  playingIndex: 0,
  setPlayingIndex: (playingIndex) => set({ playingIndex }),
}));
