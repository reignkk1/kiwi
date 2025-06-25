import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useAlertStore } from "../../store/shared";

export function useControllerButtonsStore() {
  const [isShuffle, isLoop, toggleShuffle, toggleLoop] = useAudioStore(
    useShallow((state) => [
      state.isShuffle,
      state.isLoop,
      state.toggleShuffle,
      state.toggleLoop,
    ])
  );

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  return {
    state: { isShuffle, isLoop },
    action: { toggleShuffle, toggleLoop, toggleFadeAlertMessage },
  };
}
