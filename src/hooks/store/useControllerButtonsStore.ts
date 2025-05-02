import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useAlertStore } from "../../store/shared";

export function useControllerButtonsStore() {
  const [isShuffle, isRepeat, toggleShuffle, toggleRepeat] = useAudioStore(
    useShallow((state) => [
      state.isShuffle,
      state.isRepeat,
      state.toggleShuffle,
      state.toggleRepeat,
    ])
  );

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  return {
    state: { isShuffle, isRepeat },
    action: { toggleShuffle, toggleRepeat, toggleFadeAlertMessage },
  };
}
