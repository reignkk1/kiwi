import type { MusicType } from "../types";
import { useAudioStore } from "../store/audio";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../store/shared";
import useAudioPlayTypes from "./audio/useAudioPlayTypes";

// next 클릭하면 nextStack에 없으면 노래 뽑아서 재생하고 있으면 해당곡 재생..

const nextHistory: { current: Array<MusicType> } = { current: [] };
const prevHistory: { current: Array<MusicType> } = { current: [] };

export function useShuffleOnDispatcher() {
  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  const { playRandom } = useAudioPlayTypes();

  const next = () => {
    if (nextHistory.current.length === 0) {
      prevHistory.current.push(currentMusic);
      playRandom();
    }
  };

  const prev = () => {
    if (prevHistory.current.length === 0) {
      nextHistory.current.push(currentMusic);
      playRandom();
    } else {
      const popMusic = prevHistory.current.pop()!;
      setCurrentMusic(popMusic);
      setIsPlay(true);
    }
  };

  return { next, prev };
}

export function useShuffleOffDispather() {
  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const [currentMusic, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.currentMusic, state.setCurrentMusic])
  );

  const { playInOrder, playRandom } = useAudioPlayTypes();

  const next = () => {
    if (nextHistory.current.length === 0) {
      prevHistory.current.push(currentMusic);
      playRandom();
    } else {
    }
  };

  const prev = () => {
    if (prevHistory.current.length === 0) {
      nextHistory.current.push(currentMusic);
      playRandom();
    } else {
      const popMusic = prevHistory.current.pop()!;
      setCurrentMusic(popMusic);
      setIsPlay(true);
    }
  };

  return { next, prev };
}
