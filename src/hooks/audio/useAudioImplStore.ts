import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useCurrentMusicStore,
  usePlayDirectionStore,
  useProgressStore,
} from "../../store/shared";

export function useAudioImplStore() {
  const [isPlay, isRepeat, src, setDuration, setSrc, setCurrentTime] =
    useAudioStore(
      useShallow((state) => [
        state.isPlay,
        state.isRepeat,
        state.src,
        state.setDuration,
        state.setSrc,
        state.setCurrentTime,
      ])
    );

  const [playDirection, setPlayDirection] = usePlayDirectionStore(
    useShallow((state) => [state.playDirection, state.setPlayDirection])
  );

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const pressedInputValue = useProgressStore(
    (state) => state.pressedInputValue
  );

  return {
    state: {
      isPlay,
      src,
      isRepeat,
      playDirection,
      currentMusic,
      pressedInputValue,
    },
    action: {
      setDuration,
      setCurrentTime,
      setPlayDirection,
      setSrc,
    },
  };
}
