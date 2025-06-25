import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";

export default function useProgressVisualStore() {
  const [currentTime, duration] = useAudioStore(
    useShallow((state) => [state.currentTime, state.duration])
  );

  return {
    state: { currentTime, duration },
  };
}
