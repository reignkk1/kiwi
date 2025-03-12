import { create } from "zustand";
import { getProgressPercent } from "../../utils";
import { MusicType } from "./types";
import { musicPlayer } from "../../lib/musicPlayer";

interface AudioState {
  isPlay: boolean;
  musicInfo: MusicType;
  progressPercent: number;
  currentTime: number;
  duration: number;
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
  toggleFadeAlertMessage: (text: AlertMessageStore["alertMessageText"]) => void;
}

export const createAudioStore = create<AudioStore>((set) => ({
  isPlay: false,
  musicInfo: {} as MusicType,
  progressPercent: 0,
  currentTime: 0,
  duration: 0,
  play: (newMusicInfo) => {
    if (newMusicInfo) {
      musicPlayer.src = `./mp3/${newMusicInfo.singer} - ${newMusicInfo.title}.mp3`;
    }
    musicPlayer.play().then(() =>
      set({
        isPlay: true,
        musicInfo: newMusicInfo,
        duration: musicPlayer.duration,
      })
    );
  },
  pause: () =>
    set(() => {
      musicPlayer.pause();
      return { isPlay: false };
    }),

  togglePlay: () =>
    set((state) => {
      if (state.isPlay) {
        musicPlayer.pause();
      } else {
        musicPlayer.play();
      }
      return { isPlay: !state.isPlay };
    }),
  updateProgressPercent: () =>
    set(() => ({
      progressPercent:
        getProgressPercent(musicPlayer.currentTime, musicPlayer.duration) || 0,
      currentTime: musicPlayer.currentTime,
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
