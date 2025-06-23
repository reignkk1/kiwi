import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import { useProgressStore } from "../../store/shared";
import { useSeekStore } from "../../store/audio/useSeekStore";

export function useProgressBarStore() {
  const [duration, setCurrentTime, currentTime] = useAudioStore(
    useShallow((state) => [
      state.duration,
      state.setCurrentTime,
      state.currentTime,
    ])
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

  const [seeking, setSeeking, setSeekTo] = useSeekStore(
    useShallow((state) => [state.seeking, state.setSeeking, state.setSeekTo])
  );

  return {
    state: {
      duration,
      progressPercent,
      progressInputValue,
      isExpandProgressBar,
      pressedInputValue,
      currentTime,
      seeking,
    },
    action: {
      setProgressPercent,
      setProgressInputValue,
      setIsExpandProgressBar,
      setCurrentTime,
      setPressedInputValue,
      setSeekTo,
      setSeeking,
    },
  };
}
