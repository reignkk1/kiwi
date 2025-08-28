import { useAudioStore } from "../store/audio";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentMusicStore } from "../store/shared";
import type { MusicType } from "../types";

export default function usePlay(music?: MusicType | null) {
  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );
  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const playList = usePlayListStore((state) => state.playList);
  const setPlayList = usePlayListStore((state) => state.setPlayList);

  return () => {
    if (!music) throw new Error("music not found");

    setPlayList([...playList, music.id]);
    setCurrentMusic({ ...music });
    setIsPlay(true);
  };
}
