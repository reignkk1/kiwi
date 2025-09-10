import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistStoreByPage() {
  const currentPage = useCurrentPage();

  const resolveStore =
    currentPage === "drawer" ? useDrawerStore : usePlayListStore;

  return resolveStore(
    useShallow((state) => ({
      category: state.category,
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlayListIds: state.setPlayListIds,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );
}
