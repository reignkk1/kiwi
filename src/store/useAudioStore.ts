import { create } from "zustand";

// 오디오에 대한 상태 Store

type AudioState = {
  src: string;
  isPlay: boolean;
  currentTime: number;
  duration: number;
};

type AudioAction = {
  setSrc: (src: AudioState["src"]) => void;
  setIsPlay: (isPlay: AudioState["isPlay"]) => void;
  setCurrentTime: (currentTime: AudioState["currentTime"]) => void;
  setDuration: (duration: AudioState["duration"]) => void;
  toggleIsPlay: () => void;
};

type AudioStore = AudioState & AudioAction;

export const useAudioStore = create<AudioStore>((set) => ({
  src: "",
  isPlay: false,
  currentTime: 0,
  duration: 0,
  setSrc: (src) => set({ src }),
  setIsPlay: () => set({ isPlay: true }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
}));
