import { useRef } from "react";
import type { MusicType } from "../../types";
import useAudioPlayTypes from "./useAudioPlayTypes";
import { useAudioStore } from "../../store/audio";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../../store/shared";
import usePlaylistResolver from "../usePlaylistResolver";

export default function useAudioDirectionHandler() {
  const { playInOrder, playRandom } = useAudioPlayTypes();
  const { playListIds, playingIndex, setPlayingIndex } = usePlaylistResolver();

  const [isShuffle, setIsPlay] = useAudioStore(
    useShallow((state) => [state.isShuffle, state.setIsPlay])
  );

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  //  음악 히스토리 스택
  const nextPlayedMusicHistory = useRef<Array<MusicType>>([]).current;
  const prevPlayedMusicHistory = useRef<Array<MusicType>>([]).current;

  const handlePlayDirection = (direction: "next" | "prev") => {
    const historyStack =
      direction === "next" ? prevPlayedMusicHistory : nextPlayedMusicHistory;

    const playHistoryStack =
      direction === "next" ? nextPlayedMusicHistory : prevPlayedMusicHistory;

    if (isShuffle) {
      if (historyStack.length === 0) {
        playHistoryStack.push(currentMusic);
        playRandom();
      } else {
        const popMusicInfo = historyStack.pop()!;
        playHistoryStack.push(currentMusic);
        setCurrentMusic(popMusicInfo);
        setIsPlay(true);
      }
    } else {
      if (playingIndex !== null) {
        if (direction === "next") {
          if (playingIndex === playListIds.length - 1) {
            setPlayingIndex(0);
          } else {
            setPlayingIndex(playingIndex + 1);
          }
        } else {
          if (playingIndex === 0) {
            setPlayingIndex(playListIds.length - 1);
          } else {
            setPlayingIndex(playingIndex - 1);
          }
        }
      }

      playInOrder(direction);
    }
  };

  return handlePlayDirection;
}

/* 
일단은 지금 셔플on 했을때 다음 이전 버튼 클릭 시 playingIndex 값을 어떻게 처리해야하지?
그냥 히스토리 스택에 곡 id랑 index값을 넣어줘야 할듯?

*/
