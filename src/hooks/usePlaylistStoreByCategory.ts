import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentMusicStore } from "../store/shared";
import { useCurrentPlaylist } from "../store/drawer/useCurrentPlaylist";

export default function usePlaylistStoreByCategory() {
  const category = useCurrentMusicStore((state) => state.category);

  const drawerState = useDrawerStore(
    useShallow((state) => ({
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  const playListState = usePlayListStore(
    useShallow((state) => ({
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );

  const currentPlaylist = useCurrentPlaylist((state) => state.currentPlaylist);

  return category === "drawer"
    ? { ...drawerState, playListIds: drawerState.playListIds[currentPlaylist] }
    : playListState;
}
