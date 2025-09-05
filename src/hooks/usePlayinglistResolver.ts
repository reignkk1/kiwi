import { useShallow } from "zustand/react/shallow";
import { useDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";
import { useCurrentMusicStore } from "../store/shared";

export default function usePlayinglistResolver() {
  const category = useCurrentMusicStore((state) => state.category);

  const resolveStore =
    category === "drawer" ? useDrawerStore : usePlayListStore;

  return resolveStore(
    useShallow((state) => ({
      playListIds: state.playListIds,
      playingIndex: state.playingIndex,
      setPlayingIndex: state.setPlayingIndex,
    }))
  );
}
