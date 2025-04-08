import { create } from "zustand";
import { MusicType } from "../shared/types";
import { getProgressPercent } from "../../utils";

interface AudioState {
  isPlay: boolean;
  musicInfo: Partial<MusicType>;
  progressPercent: number;
  currentTime: number;
  duration: number;
  src: string;
  moveTimePoint: number;
  action: "playNext" | "playPrev" | null;
}

interface AudioAction {
  toggleIsPlay: () => void;
  setIsPlay: (isPlay: AudioState["isPlay"]) => void;
  setMusicInfo: (musicInfo: AudioState["musicInfo"]) => void;
  setProgressPercent: (progressPercent: AudioState["progressPercent"]) => void;
  setCurrentTime: (currentTime: AudioState["currentTime"]) => void;
  setDuration: (duration: AudioState["duration"]) => void;
  setSrc: (src: AudioState["src"]) => void;
  setMoveTimePoint: (moveTimePoint: AudioState["moveTimePoint"]) => void;
  setAction: (action: AudioState["action"]) => void;
}

type AudioStore = AudioState & AudioAction;

export const createAudioStore = create<AudioStore>((set) => ({
  isPlay: false,
  src: "",
  musicInfo: {} as MusicType,
  progressPercent: 0,
  currentTime: 0,
  duration: 0,
  moveTimePoint: 0,
  action: null,
  toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
  setIsPlay: () => set({ isPlay: true }),
  setMusicInfo: (musicInfo) =>
    set({
      musicInfo,
      src: `/comfort/mp3/${musicInfo.singer} - ${musicInfo.title}.mp3`,
    }),
  setProgressPercent: (progressPercent) => set({ progressPercent }),
  setCurrentTime: (currentTime) =>
    set((state) => ({
      currentTime,
      progressPercent: getProgressPercent(currentTime, state.duration) || 0,
    })),
  setDuration: (duration) => set({ duration }),
  setSrc: (src) => set({ src }),
  setMoveTimePoint: (moveTimePoint) => set({ moveTimePoint }),
  setAction: (action) => set({ action }),
}));
