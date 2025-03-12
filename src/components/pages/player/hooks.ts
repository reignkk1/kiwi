import { useShallow } from "zustand/react/shallow";
import {
  createAlertMessageStore,
  createAudioStore,
  createIsExpandProgressBarStore,
  createProgressInputStore,
} from "../../shared/store";
import {
  createIsExpandLyricsStore,
  createIsLyricsClickedStore,
  createIsPlayerMenuStore,
  createIsRepeatStore,
  createIsShuffleStore,
} from "./store";

export function useLyricsAndImageStore() {
  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const isPlayerMenu = createIsPlayerMenuStore((state) => state.isPlayerMenu);

  const [musicInfo, currentTime] = createAudioStore(
    useShallow((state) => [state.musicInfo, state.currentTime])
  );

  const [isLyricsClicked, clickLyrics, unclickedLyrics] =
    createIsLyricsClickedStore(
      useShallow((state) => [
        state.isLyricsClicked,
        state.clickLyrics,
        state.unclickedLyrics,
      ])
    );

  const [isExpandLyrics, setIsExpandLyrics, toggleExpandLyrics] =
    createIsExpandLyricsStore(
      useShallow((state) => [
        state.isExpandLyrics,
        state.setIsExpandLyrics,
        state.toggleExpandLyrics,
      ])
    );

  return {
    state: {
      musicInfo,
      currentTime,
      isExpandLyrics,
      isExpandProgressBar,
      isLyricsClicked,
      isPlayerMenu,
    },
    action: {
      setIsExpandLyrics,
      toggleExpandLyrics,
      clickLyrics,
      unclickedLyrics,
    },
  };
}

export function usePlayerHeaderStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);

  const isExpandLyrics = createIsExpandLyricsStore(
    (state) => state.isExpandLyrics
  );

  const [isPlayerMenu, openPlayerMenu, closePlayerMenu] =
    createIsPlayerMenuStore(
      useShallow((state) => [
        state.isPlayerMenu,
        state.openPlayerMenu,
        state.closePlayerMenu,
      ])
    );

  return {
    state: { musicInfo, isExpandLyrics, isPlayerMenu },
    action: { openPlayerMenu, closePlayerMenu },
  };
}

export function useTimeStampStore() {
  const [duration, currentTime] = createAudioStore(
    useShallow((state) => [state.duration, state.currentTime])
  );

  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const progressInputValue = createProgressInputStore(
    (state) => state.progressInputValue
  );

  return {
    state: { duration, currentTime, isExpandProgressBar, progressInputValue },
  };
}

export function usePlayerMenuStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);

  const closePlayerMenu = createIsPlayerMenuStore(
    (state) => state.closePlayerMenu
  );

  const toggleFadeAlertMessage = createAlertMessageStore(
    (state) => state.toggleFadeAlertMessage
  );

  return {
    state: { musicInfo },
    action: {
      closePlayerMenu,
      toggleFadeAlertMessage,
    },
  };
}

export function useControllerButtonsStore() {
  const [isShuffle, toggleShuffle] = createIsShuffleStore(
    useShallow((state) => [state.isShuffle, state.toggleShuffle])
  );
  const [isRepeat, toggleRepeat] = createIsRepeatStore(
    useShallow((state) => [state.isRepeat, state.toggleRepeat])
  );
  const toggleFadeAlertMessage = createAlertMessageStore(
    (state) => state.toggleFadeAlertMessage
  );
  return {
    state: { isShuffle, isRepeat },
    action: { toggleShuffle, toggleRepeat, toggleFadeAlertMessage },
  };
}
