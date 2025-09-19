import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentPage } from "./useCurrentPage";
import { useCurrentPlaylist } from "../store/drawer/useCurrentPlaylist";

export default function usePlaylistStoreByPage() {
  const currentPage = useCurrentPage();

  const drawerState = useDrawerStore(
    useShallow((state) => ({
      category: state.category,
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlaylistIds: state.setPlaylistIds,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  const playListState = usePlayListStore(
    useShallow((state) => ({
      category: state.category,
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlaylistIds: state.setPlaylistIds,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  const currentPlaylist = useCurrentPlaylist((state) => state.currentPlaylist);

  return currentPage === "drawer"
    ? {
        ...drawerState,
        playListIds: drawerState.playListIds[currentPlaylist],
        setPlaylistIds: (playlist: number[]) =>
          drawerState.setPlaylistIds({
            ...drawerState.playListIds,
            [currentPlaylist]: playlist,
          }),
      }
    : playListState;
}
