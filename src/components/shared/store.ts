import { create } from "zustand";
import { getProgressPercent } from "../../utils";
import { MusicType } from "./types";

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
  setIsPlay: (isPlay: AudioState["isPlay"]) => void;
  toggleIsPlay: () => void;
  setProgressPercent: (progressPercent: AudioState["progressPercent"]) => void;
  setSrc: (src: AudioState["src"]) => void;
  setCurrentTime: (currentTime: AudioState["currentTime"]) => void;
  setDuration: (duration: AudioState["duration"]) => void;
  setMoveTimePoint: (moveTimePoint: AudioState["moveTimePoint"]) => void;
  setMusicInfo: (musicInfo: AudioState["musicInfo"]) => void;
  setAction: (action: AudioState["action"]) => void;
}

type AudioStore = AudioState & AudioAction;

interface ProgressInputValueStore {
  progressInputValue: number;
  setProgressInputValue: (
    progressInputValue: ProgressInputValueStore["progressInputValue"]
  ) => void;
}

interface IsExpandProgressBarStore {
  isExpandProgressBar: boolean;
  setIsExpandProgressBar: (
    isExpand: IsExpandProgressBarStore["isExpandProgressBar"]
  ) => void;
}

interface AlertMessageStore {
  alertMessageText: string;
  show: boolean;
  toggleFadeAlertMessage: (text: AlertMessageStore["alertMessageText"]) => void;
}

export const createAudioStore = create<AudioStore>((set) => ({
  isPlay: false,
  src: "",
  musicInfo: {} as MusicType,
  progressPercent: 0,
  currentTime: 0,
  duration: 0,
  moveTimePoint: 0,
  action: null,
  setIsPlay: () => set({ isPlay: true }),
  toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
  setSrc: (src) => set({ src }),
  setDuration: (duration) => set({ duration }),
  setMoveTimePoint: (moveTimePoint) => set({ moveTimePoint }),
  setProgressPercent: (progressPercent) => set({ progressPercent }),
  setCurrentTime: (currentTime) =>
    set((state) => ({
      currentTime,
      progressPercent: getProgressPercent(currentTime, state.duration) || 0,
    })),
  setMusicInfo: (musicInfo) =>
    set({
      musicInfo,
      src: `./mp3/${musicInfo.singer} - ${musicInfo.title}.mp3`,
    }),
  setAction: (action) => set({ action }),
}));

export const createProgressInputStore = create<ProgressInputValueStore>(
  (set) => ({
    progressInputValue: 0,
    setProgressInputValue: (progressInputValue) =>
      set(() => ({ progressInputValue })),
  })
);

export const createIsExpandProgressBarStore = create<IsExpandProgressBarStore>(
  (set) => ({
    isExpandProgressBar: false,
    setIsExpandProgressBar: (isExpandProgressBar) =>
      set(() => ({ isExpandProgressBar })),
  })
);

export const createAlertMessageStore = create<AlertMessageStore>((set) => {
  let timeoutId: NodeJS.Timeout;
  return {
    alertMessageText: "",
    show: false,
    toggleFadeAlertMessage: (text) => {
      clearTimeout(timeoutId);
      set(() => ({ show: true, alertMessageText: text }));
      timeoutId = setTimeout(() => set(() => ({ show: false })), 2000);
    },
  };
});
