import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useProgressStore } from "../../store/shared";

export default function useProgressVisualStore() {
  const [progressPercent, setProgressPercent] = useProgressStore(
    useShallow((state) => [state.progressPercent, state.setProgressPercent])
  );

  const [currentTime, duration] = useAudioStore(
    useShallow((state) => [state.currentTime, state.duration])
  );

  return {
    state: { progressPercent, currentTime, duration },
    action: { setProgressPercent },
  };
}
