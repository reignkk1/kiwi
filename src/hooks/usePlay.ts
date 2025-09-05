import { useEffect } from "react";
import { useAudioStore } from "../store/audio";
import { useCurrentMusicStore } from "../store/shared";
import type { MusicType } from "../types";
import { useCurrentPage } from "./useCurrentPage";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useShallow } from "zustand/react/shallow";

export default function usePlay(music?: MusicType | null) {
  const currentPage = useCurrentPage();

  const [setCategory, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [state.setCategory, state.setCurrentMusic])
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

    if (currentPage === "drawer") {
      setCategory("drawer");
    } else if (currentPage === "playlist") {
      setCategory("playList");
    }

    setCurrentMusic({ ...music });
    setIsPlay(true);
  };
}
