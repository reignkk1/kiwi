import { useEffect } from "react";
import { useAudioStore } from "../store/audio";
import { usePlayingIndexStore } from "../store/drawer/usePlayingIndexStore";
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
  const playListIds = usePlayListStore((state) => state.playList);
  const setPlayListIds = usePlayListStore((state) => state.setPlayList);
  const setPlayingIndex = usePlayingIndexStore(
    (state) => state.setPlayingIndex
  );

  useEffect(() => {
    if (currentPage !== "playlist") {
      setPlayingIndex(playListIds.length - 1);
    }
  }, [playListIds.length]);

  return () => {
    if (!music) throw new Error("music not found");
    if (currentPage !== "playlist") {
      setPlayListIds([...playListIds, music.id]);
    }

    setCurrentMusic({ ...music });
    setIsPlay(true);
  };
}
