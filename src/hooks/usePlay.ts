import { useAudioStore } from "../store/audio";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentMusicStore } from "../store/shared";
import type { MusicType } from "../types";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlay(music?: MusicType | null) {
  const currentPage = useCurrentPage();

  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );

  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const playList = usePlayListStore((state) => state.playList);
  const setPlayList = usePlayListStore((state) => state.setPlayList);

  return () => {
    if (!music) throw new Error("music not found");
    if (currentPage !== "playlist") {
      setPlayList([...playList, music.id]);
    }

    setCurrentMusic({ ...music });
    setIsPlay(true);
  };
}
