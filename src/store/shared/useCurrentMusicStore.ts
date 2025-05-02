import { create } from "zustand";
import { MusicType } from "./../../types";

// 현재 재생중인 음악의 상태 정보

type CurrentMusicState = {
  currentMusic: MusicType;
};

type CurrentMusicAction = {
  setCurrentMusic: (music: CurrentMusicState["currentMusic"]) => void;
};

type CurrentMusicStore = CurrentMusicState & CurrentMusicAction;

export const useCurrentMusicStore = create<CurrentMusicStore>((set) => ({
  currentMusic: {} as MusicType,
  setCurrentMusic: (music) => set({ currentMusic: music }),
}));
