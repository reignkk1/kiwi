import { create } from "zustand";
import { MusicType } from "../shared/types";
import { getProgressPercent } from "../../utils";
import { musicDrawerStorage } from "../../lib/localStorage";
import music from "../../musicData.json";

interface AudioState {
  isPlay: boolean;
  musicInfo: MusicType;
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

const { get: getMusicDrawerStorage } = musicDrawerStorage;
const musicDrawer = getMusicDrawerStorage("musicDrawer");
const defaultMusicInfo = music.data.find(
  (music) => music.id === musicDrawer[0]
);

export const createAudioStore = create<AudioStore>((set) => ({
  isPlay: false,
  src: "",
  musicInfo: defaultMusicInfo as MusicType,
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
