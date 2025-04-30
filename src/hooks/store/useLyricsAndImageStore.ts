import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useIsExpandLyricsStore,
  useIsLyricsClickedStore,
} from "../../store/player";
import { useCurrentMusicStore, useProgressStore } from "../../store/shared";

export function useLyricsAndImageStore() {
  const isExpandProgressBar = useProgressStore(
    (state) => state.isExpandProgressBar
  );

  const currentTime = useAudioStore((state) => state.currentTime);

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const [isLyricsClicked, clickLyrics, unclickedLyrics] =
    useIsLyricsClickedStore(
      useShallow((state) => [
        state.isLyricsClicked,
        state.clickLyrics,
        state.unclickedLyrics,
      ])
    );

  const [isExpandLyrics, setIsExpandLyrics, toggleExpandLyrics] =
    useIsExpandLyricsStore(
      useShallow((state) => [
        state.isExpandLyrics,
        state.setIsExpandLyrics,
        state.toggleExpandLyrics,
      ])
    );

  return {
    state: {
      currentMusic,
      currentTime,
      isExpandLyrics,
      isExpandProgressBar,
      isLyricsClicked,
    },
    action: {
      setIsExpandLyrics,
      toggleExpandLyrics,
      clickLyrics,
      unclickedLyrics,
    },
  };
}
