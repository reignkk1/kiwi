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
    isExpandProgressBar,
    setProgressPercent,
    setProgressInputValue,
    setIsExpandProgressBar,
  ] = useProgressStore(
    useShallow((state) => [
      state.progressPercent,
      state.progressInputValue,
      state.isExpandProgressBar,
      state.setProgressPercent,
      state.setProgressInputValue,
      state.setIsExpandProgressBar,
    ])
  );

  return {
    state: {
      duration,
      progressPercent,
      progressInputValue,
      isExpandProgressBar,
    },
    action: {
      setProgressPercent,
      setProgressInputValue,
      setIsExpandProgressBar,
      setCurrentTime,
    },
  };
}
