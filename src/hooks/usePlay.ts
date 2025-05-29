import { useAudioStore } from "../store/audio";
import { useCurrentMusicStore } from "../store/shared";
import { MusicType } from "../types";

export default function usePlay(music: MusicType) {
  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );

  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const play = () => {
    if (!music) throw new Error("music not found");

    setCurrentMusic({ ...music });
    setIsPlay(true);
  };

  return play;
}
