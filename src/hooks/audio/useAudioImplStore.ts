import { useShallow } from "zustand/react/shallow";
import { useAudioStore } from "../../store/audio";
import {
  useCurrentMusicStore,
  usePlayDirectionStore,
} from "../../store/shared";
import { useSeekStore } from "../../store/audio/useSeekStore";

export function useAudioImplStore() {
  const [isPlay, isLoop, src, setDuration, setSrc, setCurrentTime] =
    useAudioStore(
      useShallow((state) => [
        state.isPlay,
        state.isLoop,
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

  const [seekTo, setSeekTo, setSeeking] = useSeekStore(
    useShallow((state) => [state.seekTo, state.setSeekTo, state.setSeeking])
  );

  return {
    state: {
      isPlay,
      src,
      isLoop,
      playDirection,
      currentMusic,
      seekTo,
    },
    action: {
      setDuration,
      setCurrentTime,
      setPlayDirection,
      setSrc,
      setSeekTo,
      setSeeking,
    },
  };
}
