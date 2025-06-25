import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useSeekStore } from "../../store/audio/useSeekStore";

export function useTimeStampStore() {
  const [duration, currentTime] = useAudioStore(
    useShallow((state) => [state.duration, state.currentTime])
  );

  const [seeking, seekingValue] = useSeekStore(
    useShallow((state) => [state.seeking, state.seekingValue])
  );

  return {
    state: { duration, currentTime, seeking, seekingValue },
  };
}
