import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../../store/shared";
import {
  useMusicDrawerStore,
  useSelectedMusicIdsStore,
} from "../../store/storage";

export default function useMusicDrawerListStore() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);

  const [selectedMusicIds, setSelectedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  return {
    state: { currentMusic, musicDrawer, selectedMusicIds },
    action: { setSelectedMusicIds },
  };
}
