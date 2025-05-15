import { useShallow } from "zustand/react/shallow";
import { useMusicDrawerStore } from "../../store/storage";
import { useAlertStore, useCurrentMusicStore } from "../../store/shared";

export default function usePutInMusicDrawerStore() {
  const [musicDrawer, setMusicDrawer] = useMusicDrawerStore(
    useShallow((state) => [state.musicDrawer, state.setMusicDrawer])
  );
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);
  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  return {
    state: { musicDrawer, currentMusic },
    action: { toggleFadeAlertMessage, setMusicDrawer },
  };
}
