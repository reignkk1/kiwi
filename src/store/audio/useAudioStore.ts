import { create } from "zustand";

// 오디오에 대한 상태 Store

type AudioState = {
  isPlay: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  src: string;
  currentTime: number;
  duration: number;
};

type AudioAction = {
  setIsPlay: (isPlay: AudioState["isPlay"]) => void;
  setIsShuffle: (isShuffle: AudioState["isShuffle"]) => void;
  setIsRepeat: (isRepeat: AudioState["isRepeat"]) => void;
  setSrc: (src: AudioState["src"]) => void;
  setCurrentTime: (currentTime: AudioState["currentTime"]) => void;
  setDuration: (duration: AudioState["duration"]) => void;
  toggleIsPlay: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
};

type AudioStore = AudioState & AudioAction;

const audio = new Audio();

export const useAudioStore = create<AudioStore>((set) => ({
  isPlay: !audio.paused,
  isShuffle: false,
  isRepeat: false,
  src: "",
  currentTime: 0,
  duration: 0,
  setIsPlay: () => set({ isPlay: true }),
  setIsShuffle: (isShuffle) => set({ isShuffle }),
  setIsRepeat: (isRepeat) => set({ isRepeat }),
  setSrc: (src) => set({ src }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
}));
