import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useCurrentMusicStore,
  usePlayDirectionStore,
} from "../../store/shared";

export function useAudioImplStore() {
  const [
    isPlay,
    isShuffle,
    isRepeat,
    src,
    currentTime,
    setIsPlay,
    setDuration,
    setSrc,
    setCurrentTime,
  ] = useAudioStore(
    useShallow((state) => [
      state.isPlay,
      state.isShuffle,
      state.isRepeat,
      state.src,
      state.currentTime,
      state.setIsPlay,
      state.setDuration,
      state.setSrc,
      state.setCurrentTime,
    ])
  );

  const [playDirection, setPlayDirection] = usePlayDirectionStore(
    useShallow((state) => [state.playDirection, state.setPlayDirection])
  );

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  return {
    state: {
      isPlay,
      src,
      isShuffle,
      isRepeat,
      currentTime,
      playDirection,
      currentMusic,
    },
    action: {
      setIsPlay,
      setDuration,
      setCurrentTime,
      setPlayDirection,
      setCurrentMusic,
      setSrc,
    },
  };
}
