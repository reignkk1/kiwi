import { create } from "zustand";
import type { MusicType } from "./../../types";

// 현재 재생중인 음악의 상태 정보

type CurrentMusicState = {
  currentMusic: MusicType;
  category: "playList" | "drawer" | null;
};

type CurrentMusicAction = {
  setCurrentMusic: (music: CurrentMusicState["currentMusic"]) => void;
  setCategory: (category: CurrentMusicState["category"]) => void;
};

type CurrentMusicStore = CurrentMusicState & CurrentMusicAction;

export const useCurrentMusicStore = create<CurrentMusicStore>((set) => ({
  currentMusic: {} as MusicType,
  category: null,
  setCurrentMusic: (music) => set({ currentMusic: music }),
  setCategory: (category) => set({ category }),
}));
