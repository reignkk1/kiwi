import { useEffect } from "react";
import { useAudioStore } from "../store/audio";
import { useCurrentMusicStore } from "../store/shared";
import type { MusicType } from "../types";
import { useCurrentPage } from "./useCurrentPage";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";

export default function usePlay(music?: MusicType | null) {
  const currentPage = useCurrentPage();

  const [category, setCategory, setCurrentMusic] = useCurrentMusicStore(
    useShallow((state) => [
      state.category,
      state.setCategory,
      state.setCurrentMusic,
    ])
  );

  const setIsPlay = useAudioStore((state) => state.setIsPlay);

  const [playListIds, setPlaylistIds, setPlayingIndex] = usePlayListStore(
    useShallow((state) => [
      state.playListIds,
      state.setPlaylistIds,
      state.setPlayingIndex,
    ])
  );

  const setDrawerPlayingIndex = useDrawerStore(
    (state) => state.setPlayingIndex
  );

  useEffect(() => {
    if (category === "drawer") {
      setPlayingIndex(null);
    } else if (category === "playList") {
      setDrawerPlayingIndex(null);
    }
  }, [category]);

  return () => {
    if (!music) throw new Error("music not found");

    if (currentPage !== "drawer" && currentPage !== "playlist") {
      setPlaylistIds([...playListIds, music.id]);
      const newPLayListIds = usePlayListStore.getState().playListIds;
      setPlayingIndex(newPLayListIds.length - 1);
      setCategory("playList");
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
