import { useShallow } from "zustand/react/shallow";
import {
  createAudioStore,
  createIsExpandProgressBarStore,
  createProgressInputStore,
} from "../../shared/store";
import {
  createIsExpandLyricsStore,
  createIsLyricsClickedStore,
  createIsPlayerMenuStore,
} from "./store";

export function useLyricsAndImageStore() {
  const [musicInfo, currentTime] = createAudioStore(
    useShallow((state) => [state.musicInfo, state.currentTime])
  );

  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const [isLyricsClicked, clickLyrics] = createIsLyricsClickedStore(
    useShallow((state) => [state.isLyricsClicked, state.clickLyrics])
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
    },
    action: { setIsExpandLyrics, toggleExpandLyrics, clickLyrics },
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
  const [audio, currentTime] = createAudioStore(
    useShallow((state) => [state.audio, state.currentTime])
  );

  const isExpandProgressBar = createIsExpandProgressBarStore(
    (state) => state.isExpandProgressBar
  );

  const progressInputValue = createProgressInputStore(
    (state) => state.progressInputValue
  );

  return {
    state: { audio, currentTime, isExpandProgressBar, progressInputValue },
  };
}
