import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useIsExpandLyricsStore,
  useIsLyricsClickedStore,
} from "../../store/player";
import { useCurrentMusicStore } from "../../store/shared";
import { useSeekStore } from "../../store/audio/useSeekStore";

export function useLyricsAndImageStore() {
  const seeking = useSeekStore((state) => state.seeking);

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
      isLyricsClicked,
      seeking,
    },
    action: {
      setIsExpandLyrics,
      toggleExpandLyrics,
      clickLyrics,
      unclickedLyrics,
    },
  };
}
