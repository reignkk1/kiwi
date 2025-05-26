import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useProgressStore } from "../../store/shared";

export function useProgressBarStore() {
  const [duration, setCurrentTime] = useAudioStore(
    useShallow((state) => [state.duration, state.setCurrentTime])
  );
  const [
    progressPercent,
    progressInputValue,
    pressedInputValue,
    isExpandProgressBar,
    setProgressPercent,
    setProgressInputValue,
    setIsExpandProgressBar,
    setPressedInputValue,
  ] = useProgressStore(
    useShallow((state) => [
      state.progressPercent,
      state.progressInputValue,
      state.pressedInputValue,
      state.isExpandProgressBar,
      state.setProgressPercent,
      state.setProgressInputValue,
      state.setIsExpandProgressBar,
      state.setPressedInputValue,
    ])
  );

  return {
    state: {
      duration,
      progressPercent,
      progressInputValue,
      isExpandProgressBar,
      pressedInputValue,
    },
    action: {
      setProgressPercent,
      setProgressInputValue,
      setIsExpandProgressBar,
      setCurrentTime,
      setPressedInputValue,
    },
  };
}
