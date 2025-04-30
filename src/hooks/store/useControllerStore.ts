import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useAlertStore, usePlayDirectionStore } from "../../store/shared";

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
  return {
    state: { isPlay, isShuffle },
    action: { toggleIsPlay, setPlayDirection, toggleFadeAlertMessage },
  };
}
