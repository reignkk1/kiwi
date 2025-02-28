import { create } from "zustand";
import { getProgressPercent } from "../../utils";
import { MusicType } from "./types";

interface AudioState {
  audio: HTMLAudioElement;
  isPlay: boolean;
  musicInfo: MusicType;
  progressPercent: number;
  currentTime: number;
}

interface AudioAction {
  play: (musicInfo: AudioState["musicInfo"]) => void;
  pause: () => void;
  togglePlay: () => void;
  updateProgressPercent: () => void;
  setProgressPercent: (value?: AudioState["progressPercent"]) => void;
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
  showAlertMessage: (text: AlertMessageStore["alertMessageText"]) => void;
  hiddenAlertMessage: () => void;
}

export const createAudioStore = create<AudioStore>((set) => ({
  audio: new Audio(),
  isPlay: false,
  musicInfo: {} as MusicType,
  progressPercent: 0,
  currentTime: 0,
  play: (newMusicInfo) =>
    set((state) => {
      if (newMusicInfo) {
        state.audio.src = `./mp3/${newMusicInfo.singer} - ${newMusicInfo.title}.mp3`;
      }
      state.audio.play();
      return { isPlay: true, musicInfo: newMusicInfo };
    }),
  pause: () =>
    set((state) => {
      state.audio.pause();
      return { isPlay: false };
    }),

  togglePlay: () =>
    set((state) => {
      if (state.isPlay) {
        state.audio.pause();
      } else {
        state.audio.play();
      }
      return { isPlay: !state.isPlay };
    }),
  updateProgressPercent: () =>
    set((state) => ({
      progressPercent:
        getProgressPercent(state.audio.currentTime, state.audio.duration) || 0,
      currentTime: state.audio.currentTime,
    })),

  setProgressPercent: (value) =>
    set(() => ({
      progressPercent: value,
    })),
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

export const createAlertMessageStore = create<AlertMessageStore>((set) => ({
  alertMessageText: "",
  show: false,
  showAlertMessage: (text) =>
    set(() => ({ show: true, alertMessageText: text })),
  hiddenAlertMessage: () => set(() => ({ show: false })),
}));
