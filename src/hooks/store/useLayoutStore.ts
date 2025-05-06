import { useShallow } from "zustand/react/shallow";
import { useEntryModalStore, useUserNameStore } from "../../store/layout";
import { useCurrentMusicStore } from "../../store/shared";

export function useLayoutStore() {
  const musicBackGroundColor = useCurrentMusicStore(
    (state) => state.currentMusic.backGroundColor
  );
  const [isModal, hiddenModal, showModal] = useEntryModalStore(
    useShallow((state) => [state.isModal, state.hiddenModal, state.showModal])
  );

  const userName = useUserNameStore((state) => state.userName);
  return {
    state: { isModal, musicBackGroundColor, userName },
    action: { hiddenModal, showModal },
  };
}
