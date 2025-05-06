import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useAlertStore,
  useCurrentMusicStore,
  usePlayDirectionStore,
} from "../../store/shared";
import { useMusicDrawerStore } from "../../store/storage/useMusicDrawerStore";

export function useControllerStore() {
  const [isPlay, isShuffle, toggleIsPlay] = useAudioStore(
    useShallow((state) => [state.isPlay, state.isShuffle, state.toggleIsPlay])
  );

  const setPlayDirection = usePlayDirectionStore(
    (state) => state.setPlayDirection
  );

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);

  const currnetMusic = useCurrentMusicStore((state) => state.currentMusic);

  return {
    state: { isPlay, isShuffle, musicDrawer, currnetMusic },
    action: { toggleIsPlay, setPlayDirection, toggleFadeAlertMessage },
  };
}
