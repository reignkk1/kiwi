import { useEffect } from "react";
import { useAudioStore } from "../store/audio";
import { useCurrentMusicStore } from "../store/shared";
import type { MusicType } from "../types";
import { useCurrentPage } from "./useCurrentPage";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useShallow } from "zustand/react/shallow";

export default function usePlay(music?: MusicType | null) {
  const currentPage = useCurrentPage();
  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );

  const setIsPlay = useAudioStore((state) => state.setIsPlay);
  const [playListIds, setPlayListIds, setPlayingIndex] = usePlayListStore(
    useShallow((state) => [
      state.playListIds,
      state.setPlayListIds,
      state.setPlayingIndex,
    ])
  );

  useEffect(() => {
    if (currentPage !== "drawer" && currentPage !== "playlist") {
      setPlayingIndex(playListIds.length - 1);
    }
  }, [playListIds.length]);

  return () => {
    if (!music) throw new Error("music not found");
    if (currentPage !== "drawer" && currentPage !== "playlist") {
      setPlayListIds([...playListIds, music.id]);
    }

    setCurrentMusic({ ...music });
    setIsPlay(true);
  };
}
