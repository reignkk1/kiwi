import { useShallow } from "zustand/react/shallow";
import { useInformModalStore } from "./../../store/layout/useInfoModalStore";
import {
  useMusicDrawerStore,
  useSelectedMusicIdsStore,
} from "../../store/storage";

export default function useInformStore() {
  const [informModalContent, setIsShowInformModal] = useInformModalStore(
    useShallow((state) => [
      state.informModalContent,
      state.setIsShowInformModal,
    ])
  );

  const [selectedMusicIds, setSelectedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  const [musicDrawer, setMusicDrawer] = useMusicDrawerStore(
    useShallow((state) => [state.musicDrawer, state.setMusicDrawer])
  );

  return {
    state: { selectedMusicIds, musicDrawer, informModalContent },
    action: { setIsShowInformModal, setSelectedMusicIds, setMusicDrawer },
  };
}
