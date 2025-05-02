import { useShallow } from "zustand/react/shallow";
import { useEntryModalStore } from "../../store/layout";
import { useCurrentMusicStore } from "../../store/shared";

export function useLayoutStore() {
  const musicBackGroundColor = useCurrentMusicStore(
    (state) => state.currentMusic.backGroundColor
  );
  const [isModal, hiddenModal, showModal] = useEntryModalStore(
    useShallow((state) => [state.isModal, state.hiddenModal, state.showModal])
  );
  return {
    state: { isModal, musicBackGroundColor },
    action: { hiddenModal, showModal },
  };
}
