import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../store/audio";
import { useAlertStore } from "../store/shared";

export default function useControllerButtonsHandler() {
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

  const handleShuffleClick = () => {
    toggleShuffle();

    const message = isShuffle
      ? "셔플을 사용하지 않습니다."
      : "셔플을 사용합니다.";

    toggleFadeAlertMessage(message);
  };

  const handleRepeatClick = () => {
    toggleLoop();

    const message = isLoop
      ? "반복을 사용하지 않습니다."
      : "현재 음악을 반복합니다.";

    toggleFadeAlertMessage(message);
  };

  return { handleShuffleClick, handleRepeatClick, isLoop, isShuffle };
}
