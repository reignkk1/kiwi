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
    moveTimePoint,
    musicInfo,
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
      state.moveTimePoint,
      state.musicInfo,
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
      moveTimePoint,
      musicInfo,
      isShuffle,
      isRepeat,
    },
    action: { setIsPlay, setMusicInfo, setDuration, setCurrentTime, setAction },
  };
}
