import { useShallow } from "zustand/react/shallow";
import {
  createAlertMessageStore,
  createAudioStore,
  createIsExpandProgressBarStore,
  createProgressInputStore,
} from "./store";
import { createIsShuffleStore } from "../pages/player/store";

export function useAlbumImgStore() {
  const [setIsPlay, setMusicInfo] = createAudioStore(
    useShallow((state) => [state.setIsPlay, state.setMusicInfo])
  );
  return { action: { setIsPlay, setMusicInfo } };
}

export function useControllerStore() {
  const [isPlay, toggleIsPlay, setAction] = createAudioStore(
    useShallow((state) => [state.isPlay, state.toggleIsPlay, state.setAction])
  );
  const isShuffle = createIsShuffleStore((state) => state.isShuffle);
  return { state: { isPlay, isShuffle }, action: { toggleIsPlay, setAction } };
}

export function useProgressStore() {
  const [progressPercent] = createAudioStore(
    useShallow((state) => [state.progressPercent])
  );
  return {
    state: { progressPercent },
  };
}

export function useProgressBarStore() {
  const [duration, progressPercent, setProgressPercent, setMoveTimePoint] =
    createAudioStore(
      useShallow((state) => [
        state.duration,
        state.progressPercent,
        state.setProgressPercent,
        state.setMoveTimePoint,
      ])
    );

  const [progressInputValue, setProgressInputValue] = createProgressInputStore(
    useShallow((state) => [
      state.progressInputValue,
      state.setProgressInputValue,
    ])
  );

  const [isExpandProgressBar, setIsExpandProgressBar] =
    createIsExpandProgressBarStore(
      useShallow((state) => [
        state.isExpandProgressBar,
        state.setIsExpandProgressBar,
      ])
    );

  return {
    state: {
      duration,
      progressPercent,
      progressInputValue,
      isExpandProgressBar,
    },
    action: {
      setProgressPercent,
      setProgressInputValue,
      setIsExpandProgressBar,
      setMoveTimePoint,
    },
  };
}

export function useMusicCardStore() {
  const [setIsPlay, setMusicInfo] = createAudioStore(
    useShallow((state) => [state.setIsPlay, state.setMusicInfo])
  );
  return { action: { setIsPlay, setMusicInfo } };
}

export function useAlertStore() {
  const [alertMessageText, show] = createAlertMessageStore(
    useShallow((state) => [state.alertMessageText, state.show])
  );

  return {
    state: { alertMessageText, show },
  };
}
