import { useRef } from "react";
import { MusicType } from "../../types";
import useAudioRef from "./useAudioRef";
import useMusicDrawerStorage from "../localStorage/useMusicDrawerStorage";
import useAudioPlayTypes from "./useAudioPlayTypes";
import { useAudioStore } from "../../store/audio";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../../store/shared";

export default function useAudioDirectionHandler() {
  const { musicDrawer } = useMusicDrawerStorage();
  const { audio } = useAudioRef();

  const { playInOrder, playRandom } = useAudioPlayTypes();

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
    if (musicDrawer.length === 1) {
      setIsPlay(true);
      audio.load();
      audio.play();
      return;
    }

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
      playInOrder(direction);
    }
  };

  return handlePlayDirection;
}
