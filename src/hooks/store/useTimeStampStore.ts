import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useProgressStore } from "../../store/shared";

export function useTimeStampStore() {
  const [duration, currentTime] = useAudioStore(
    useShallow((state) => [state.duration, state.currentTime])
  );

  const isExpandProgressBar = useProgressStore(
    (state) => state.isExpandProgressBar
  );

  const progressInputValue = useProgressStore(
    (state) => state.progressInputValue
  );

  return {
    state: { duration, currentTime, isExpandProgressBar, progressInputValue },
  };
}
