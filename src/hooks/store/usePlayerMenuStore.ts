import { useIsPlayerMenuStore } from "../../store/player";
import { useCurrentMusicStore } from "../../store/shared";

export function usePlayerMenuStore() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const closePlayerMenu = useIsPlayerMenuStore(
    (state) => state.closePlayerMenu
  );

  return {
    state: { currentMusic },
    action: {
      closePlayerMenu,
    },
  };
}
