import { useShallow } from "zustand/react/shallow";
import {
  useIsExpandLyricsStore,
  useIsPlayerMenuStore,
} from "../../store/player";
import { useCurrentMusicStore } from "../../store/shared";

export function usePlayerHeaderStore() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const isExpandLyrics = useIsExpandLyricsStore(
    (state) => state.isExpandLyrics
  );

  const [isPlayerMenu, openPlayerMenu, closePlayerMenu] = useIsPlayerMenuStore(
    useShallow((state) => [
      state.isPlayerMenu,
      state.openPlayerMenu,
      state.closePlayerMenu,
    ])
  );

  return {
    state: { currentMusic, isExpandLyrics, isPlayerMenu },
    action: { openPlayerMenu, closePlayerMenu },
  };
}
