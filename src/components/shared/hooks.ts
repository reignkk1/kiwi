import { useShallow } from "zustand/react/shallow";
import {
  createAlertMessageStore,
  createAudioStore,
  createIsExpandProgressBarStore,
  createProgressInputStore,
} from "./store";

export function useAlbumImgStore() {
  const playMusic = createAudioStore((state) => state.play);
  return { action: { playMusic } };
}

export function useControllerStore() {
  const [isPlay, togglePlay] = createAudioStore(
    useShallow((state) => [state.isPlay, state.togglePlay])
  );
  return { state: { isPlay }, action: { togglePlay } };
}

export function useProgressStore() {
  const [audio, progressPercent, updateProgressPercent] = createAudioStore(
    useShallow((state) => [
      state.audio,
      state.progressPercent,
      state.updateProgressPercent,
    ])
  );
  return {
    state: { audio, progressPercent },
    action: { updateProgressPercent },
  };
}

export function useProgressBarStore() {
  const [audio, progressPercent, setProgressPercent] = createAudioStore(
    useShallow((state) => [
      state.audio,
      state.progressPercent,
      state.setProgressPercent,
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
    state: { audio, progressPercent, progressInputValue, isExpandProgressBar },
    action: {
      setProgressPercent,
      setProgressInputValue,
      setIsExpandProgressBar,
    },
  };
}

export function useMusicCardStore() {
  const musicPlay = createAudioStore((state) => state.play);
  return { action: { musicPlay } };
}

export function useAlertStore() {
  const [alertMessageText, show] = createAlertMessageStore(
    useShallow((state) => [state.alertMessageText, state.show])
  );

  return {
    state: { alertMessageText, show },
  };
}
