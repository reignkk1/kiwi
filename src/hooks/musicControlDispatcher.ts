import type { MusicType } from "../types";
import { useAudioStore } from "../store/audio";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../store/shared";
import useAudioPlayTypes from "./audio/useAudioPlayTypes";

const nextHistory: { current: Array<MusicType> } = { current: [] };
const prevHistory: { current: Array<MusicType> } = { current: [] };

export function useShuffleOnDispatcher() {
  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  const { playRandom } = useAudioPlayTypes();

  const handleDirection = (direction: "next" | "prev") => {
    const playHistory = direction === "next" ? nextHistory : prevHistory;
    const playedHistory = direction === "next" ? prevHistory : nextHistory;

    if (playHistory.current.length === 0) {
      playedHistory.current.push(currentMusic);
      playRandom();
    } else {
      const popMusic = playHistory.current.pop()!;
      setCurrentMusic(popMusic);
      setIsPlay(true);
    }
  };

  const next = () => handleDirection("next");
  const prev = () => handleDirection("prev");

  return { next, prev };
}

export function useShuffleOffDispather() {
  const { playInOrder } = useAudioPlayTypes();

  const next = () => playInOrder("next");
  const prev = () => playInOrder("prev");

  return { next, prev };
}
