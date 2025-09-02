import { useAudioStore } from "../store/audio";
import { useAlertStore, useCurrentMusicStore } from "../store/shared";
import {
  useShuffleOffController,
  useShuffleOnController,
} from "./useShuffleController";
import usePlaylistStoreDispatcher from "./usePlaylistStoreResolver";

export default function useMusicController() {
  const { category, playListIds } = usePlaylistStoreDispatcher();

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  const currnetMusic = useCurrentMusicStore((state) => state.currentMusic);

  const togglePlay = useAudioStore((state) => state.togglePlay);

  const play = () => {
    if (Object.keys(currnetMusic).length) {
      togglePlay();
    }
  };

  if (playListIds.length === 0) {
    return {
      next: () => toggleFadeAlertMessage(`${category}에 곡이 없습니다.`),
      prev: () => toggleFadeAlertMessage(`${category}에 곡이 없습니다.`),
      play,
    };
  }

  const isShuffle = useAudioStore((state) => state.isShuffle);

  const resolveController = isShuffle
    ? useShuffleOnController()
    : useShuffleOffController();

  return { ...resolveController, play };
}
