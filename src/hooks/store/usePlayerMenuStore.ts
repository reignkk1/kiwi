import { useIsPlayerMenuStore } from "../../store/player";
import { useAlertStore, useCurrentMusicStore } from "../../store/shared";

export function usePlayerMenuStore() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const closePlayerMenu = useIsPlayerMenuStore(
    (state) => state.closePlayerMenu
  );

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  return {
    state: { currentMusic },
    action: {
      closePlayerMenu,
      toggleFadeAlertMessage,
    },
  };
}
