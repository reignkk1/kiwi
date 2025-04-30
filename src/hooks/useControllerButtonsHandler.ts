import { useControllerButtonsStore } from "./store/useControllerButtonsStore";

export default function useControllerButtonsHandler() {
  const {
    state: { isRepeat, isShuffle },
    action: { toggleRepeat, toggleShuffle, toggleFadeAlertMessage },
  } = useControllerButtonsStore();

  const handleShuffleClick = () => {
    toggleShuffle();
    isShuffle
      ? toggleFadeAlertMessage("셔플을 사용하지 않습니다.")
      : toggleFadeAlertMessage("셔플을 사용합니다.");
  };

  const handleRepeatClick = () => {
    toggleRepeat();
    isRepeat
      ? toggleFadeAlertMessage("반복을 사용하지 않습니다.")
      : toggleFadeAlertMessage("현재 음악을 반복합니다.");
  };

  return { handleShuffleClick, handleRepeatClick, isRepeat, isShuffle };
}
