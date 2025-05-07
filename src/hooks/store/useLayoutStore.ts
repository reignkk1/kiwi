import { useShallow } from "zustand/react/shallow";
import { useEntryModalStore, useUserNameStore } from "../../store/layout";
import { useCurrentMusicStore } from "../../store/shared";
import { useInformModalStore } from "../../store/layout/useInfoModalStore";

export function useLayoutStore() {
  const musicBackGroundColor = useCurrentMusicStore(
    (state) => state.currentMusic.backGroundColor
  );
  const [isShowEntryModal, hiddenEntryModal, showEntryModal] =
    useEntryModalStore(
      useShallow((state) => [
        state.isShowEntryModal,
        state.hiddenEntryModal,
        state.showEntryModal,
      ])
    );

  const userName = useUserNameStore((state) => state.userName);
  const isShowInformModal = useInformModalStore(
    (state) => state.isShowInformModal
  );
  return {
    state: {
      isShowEntryModal,
      musicBackGroundColor,
      userName,
      isShowInformModal,
    },
    action: { hiddenEntryModal, showEntryModal },
  };
}
