import { useShallow } from "zustand/react/shallow";
import { createAudioStore } from "./store";
import {
  createIsRepeatStore,
  createIsShuffleStore,
} from "../pages/player/store";

export function useAudioImplStore() {
  const [
    isPlay,
    src,
    action,
    musicInfo,
    currentTime,
    setIsPlay,
    setMusicInfo,
    setDuration,
    setCurrentTime,
    setAction,
  ] = createAudioStore(
    useShallow((state) => [
      state.isPlay,
      state.src,
      state.action,
      state.musicInfo,
      state.currentTime,
      state.setIsPlay,
      state.setMusicInfo,
      state.setDuration,
      state.setCurrentTime,
      state.setAction,
    ])
  );

  const isShuffle = createIsShuffleStore((state) => state.isShuffle);
  const isRepeat = createIsRepeatStore((state) => state.isRepeat);

  return {
    state: {
      isPlay,
      src,
      action,
      musicInfo,
      isShuffle,
      isRepeat,
      currentTime,
    },
    action: { setIsPlay, setMusicInfo, setDuration, setCurrentTime, setAction },
  };
}
