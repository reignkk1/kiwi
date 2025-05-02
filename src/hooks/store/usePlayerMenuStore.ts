import { useShallow } from "zustand/react/shallow";
import { useIsPlayerMenuStore } from "../../store/player";
import { useAlertStore, useCurrentMusicStore } from "../../store/shared";
import { useMusicDrawerStore } from "../../store/storage/useMusicDrawerStore";

export function usePlayerMenuStore() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const closePlayerMenu = useIsPlayerMenuStore(
    (state) => state.closePlayerMenu
  );

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  const [musicDrawer, setMusicDrawer] = useMusicDrawerStore(
    useShallow((state) => [state.musicDrawer, state.setMusicDrawer])
  );

  return {
    state: { currentMusic, musicDrawer },
    action: {
      closePlayerMenu,
      toggleFadeAlertMessage,
      setMusicDrawer,
    },
  };
}
