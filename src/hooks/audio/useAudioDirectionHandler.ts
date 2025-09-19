import { useEffect, useRef } from "react";
import type { MusicType } from "../../types";
import useAudioPlayTypes from "./useAudioPlayTypes";
import { useAudioStore } from "../../store/audio";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../../store/shared";
import usePlaylistStoreByCategory from "../usePlaylistStoreByCategory";

type HistoryType = Array<{ music: MusicType; index: number | null }>;

export default function useAudioDirectionHandler() {
  const { playInOrder, playRandom } = useAudioPlayTypes();

  const [isShuffle, setIsPlay] = useAudioStore(
    useShallow((state) => [state.isShuffle, state.setIsPlay])
  );

  const [currentMusic, setCurrentMusic, category] = useCurrentMusicStore(
    useShallow((state) => [
      state.currentMusic,
      state.setCurrentMusic,
      state.category,
    ])
  );

  const { playingIndex, setPlayingIndex } = usePlaylistStoreByCategory();

  //  음악 히스토리 스택
  const nextPlayedMusicHistory = useRef<HistoryType>([]).current;
  const prevPlayedMusicHistory = useRef<HistoryType>([]).current;

  useEffect(() => {
    nextPlayedMusicHistory.length = 0;
    prevPlayedMusicHistory.length = 0;
  }, [category]);

  const handlePlayDirection = (direction: "next" | "prev") => {
    const historyStack =
      direction === "next" ? prevPlayedMusicHistory : nextPlayedMusicHistory;

    const playHistoryStack =
      direction === "next" ? nextPlayedMusicHistory : prevPlayedMusicHistory;

    if (isShuffle) {
      if (historyStack.length === 0) {
        playHistoryStack.push({ music: currentMusic, index: playingIndex });
        playRandom();
      } else {
        const popMusicInfo = historyStack.pop()!;
        playHistoryStack.push({ music: currentMusic, index: playingIndex });
        setCurrentMusic(popMusicInfo.music);
        setPlayingIndex(popMusicInfo.index);
        setIsPlay(true);
      }
    } else {
      playInOrder(direction);
    }
  };

  return handlePlayDirection;
}
