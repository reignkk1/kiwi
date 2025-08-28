import { useMusicDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentPage } from "./useCurrentPage";

export default function useResolvedPlayListIds() {
  const category =
    useCurrentPage() === "drawer"
      ? "음악서랍"
      : useCurrentPage() === "playlist"
        ? "재생목록"
        : "unkwon";

  const playListIds =
    useCurrentPage() === "drawer"
      ? useMusicDrawerStore((state) => state.musicDrawer)
      : usePlayListStore((state) => state.playList);

  return { category, playListIds };
}
