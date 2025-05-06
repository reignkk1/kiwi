import {
  useMusicDrawerStore,
  useSelectedMusicIdsStore,
} from "../../store/storage";
import { useShallow } from "zustand/react/shallow";

export default function useSelectMenuStore() {
  const [selectedMusicIds, setSelectedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  const [musicDrawer, setMusicDrawer] = useMusicDrawerStore(
    useShallow((state) => [state.musicDrawer, state.setMusicDrawer])
  );

  return {
    state: { musicDrawer, selectedMusicIds },
    action: { setMusicDrawer, setSelectedMusicIds },
  };
}
