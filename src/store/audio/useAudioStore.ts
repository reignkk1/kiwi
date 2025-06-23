import { create } from "zustand";

// 오디오에 대한 상태 Store

type AudioState = {
  isPlay: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  src: string;
  currentTime: number;
  duration: number;
};

type AudioAction = {
  setIsPlay: (isPlay: AudioState["isPlay"]) => void;
  setIsShuffle: (isShuffle: AudioState["isShuffle"]) => void;
  setIsLoop: (isLoop: AudioState["isLoop"]) => void;
  setSrc: (src: AudioState["src"]) => void;
  setCurrentTime: (currentTime: AudioState["currentTime"]) => void;
  setDuration: (duration: AudioState["duration"]) => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
};

type AudioStore = AudioState & AudioAction;

export const useAudioStore = create<AudioStore>((set) => ({
  isPlay: false,
  isLoop: false,
  isShuffle: false,
  src: "",
  currentTime: 0,
  duration: 0,
  setIsPlay: (isPlay) => set({ isPlay }),
  setDuration: (duration) => set({ duration }),
  setIsLoop: (isLoop) => set({ isLoop }),
  setIsShuffle: (isShuffle) => set({ isShuffle }),
  setSrc: (src) => set(() => ({ src })),
  setCurrentTime: (currentTime) => set(() => ({ currentTime })),
  togglePlay: () => set((state) => ({ isPlay: !state.isPlay })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleLoop: () => set((state) => ({ isLoop: !state.isLoop })),
}));
