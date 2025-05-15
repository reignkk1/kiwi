import { useAudioStore } from "../store/audio";
import { useCurrentMusicStore } from "../store/shared";
import { getMusicDataFromId } from "../utils";

export default function usePlay(musicId?: number | string) {
  const music = getMusicDataFromId(musicId);

  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );

  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const play = () => {
    if (!music) throw new Error("music not found");

    setCurrentMusic(music);
    setIsPlay(true);
  };

  return play;
}
