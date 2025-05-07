import { useInformModalStore } from "../../store/layout/useInfoModalStore";
import { useSelectedMusicIdsStore } from "../../store/storage";
import { useShallow } from "zustand/react/shallow";

export default function useSelectMenuStore() {
  const [selectedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  const setIsShowInformModal = useInformModalStore(
    (state) => state.setIsShowInformModal
  );
  return {
    state: { selectedMusicIds },
    action: { setIsShowInformModal },
  };
}
