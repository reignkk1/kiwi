import { useMusicDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistContext() {
  const currentPage = useCurrentPage();
  const category =
    currentPage === "drawer"
      ? "음악서랍"
      : currentPage === "playlist"
        ? "재생목록"
        : "unknown";

  const playListIds =
    currentPage === "drawer"
      ? useMusicDrawerStore((state) => state.musicDrawer)
      : usePlayListStore((state) => state.playList);

  const setPlaylistIds =
    currentPage === "drawer"
      ? useMusicDrawerStore((state) => state.setMusicDrawer)
      : usePlayListStore((state) => state.setPlayList);

  return { category, playListIds, setPlaylistIds };
}
