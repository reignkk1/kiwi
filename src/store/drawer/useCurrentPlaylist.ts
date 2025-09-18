import { create } from "zustand";

type CurrnetPlaylist = {
  currentPlaylist: string;
  setCurrentPlaylist: (
    currentPlaylist: CurrnetPlaylist["currentPlaylist"]
  ) => void;
};

export const useCurrentPlaylist = create<CurrnetPlaylist>((set) => ({
  currentPlaylist: "test",
  setCurrentPlaylist: (currentPlaylist) => set({ currentPlaylist }),
}));
