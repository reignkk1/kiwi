import { useControllerButtonsStore } from "./store/useControllerButtonsStore";

export default function useControllerButtonsHandler() {
  const {
    state: { isRepeat, isShuffle },
    action: { toggleRepeat, toggleShuffle, toggleFadeAlertMessage },
  } = useControllerButtonsStore();

  const handleShuffleClick = () => {
    toggleShuffle();

    const message = isShuffle
      ? "셔플을 사용하지 않습니다."
      : "셔플을 사용합니다.";

    toggleFadeAlertMessage(message);
  };

  const handleRepeatClick = () => {
    toggleRepeat();

    const message = isRepeat
      ? "반복을 사용하지 않습니다."
      : "현재 음악을 반복합니다.";

    toggleFadeAlertMessage(message);
  };

  return { handleShuffleClick, handleRepeatClick, isRepeat, isShuffle };
}
