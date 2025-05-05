import { useShallow } from "zustand/react/shallow";
import {
  useMusicDrawerStore,
  useSelectedMusicIdsStore,
} from "../../store/storage";

export default function useTotalCountStore() {
  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);
  const [selectedMusicIds, setSeletedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  return {
    state: { musicDrawer, selectedMusicIds },
    action: { setSeletedMusicIds },
  };
}
