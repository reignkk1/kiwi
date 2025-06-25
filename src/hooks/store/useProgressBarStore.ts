import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useSeekStore } from "../../store/audio/useSeekStore";

export function useProgressBarStore() {
  const [duration, setCurrentTime, currentTime] = useAudioStore(
    useShallow((state) => [
      state.duration,
      state.setCurrentTime,
      state.currentTime,
    ])
  );

  const [seeking, setSeeking, setSeekTo, seekingValue, setSeekingValue] =
    useSeekStore(
      useShallow((state) => [
        state.seeking,
        state.setSeeking,
        state.setSeekTo,
        state.seekingValue,
        state.setSeekingValue,
      ])
    );

  return {
    state: {
      duration,
      currentTime,
      seeking,
      seekingValue,
    },
    action: {
      setCurrentTime,
      setSeekTo,
      setSeeking,
      setSeekingValue,
    },
  };
}
