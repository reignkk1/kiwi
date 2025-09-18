import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentPage } from "./useCurrentPage";

export default function usePlaylistStoreByPage() {
  const currentPage = useCurrentPage();

  const drawerState = useDrawerStore(
    useShallow((state) => ({
      category: state.category,
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlaylistIds: state.playListIds,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  const playListState = usePlayListStore(
    useShallow((state) => ({
      category: state.category,
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlaylistIds: state.playListIds,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  return currentPage === "drawer" ? drawerState : playListState;
}
