import { create } from "zustand";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlay: boolean;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audio: new Audio("./mp3/오혁 - 소녀.mp3"),
  isPlay: false,
  togglePlay: () =>
    set((state) => {
      if (state.isPlay) {
        state.audio.pause();
      } else {
        state.audio.play();
      }
      return { isPlay: !state.isPlay };
    }),
}));
