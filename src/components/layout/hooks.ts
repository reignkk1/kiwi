import { useShallow } from "zustand/react/shallow";
import { createAudioStore } from "./../audio/store";
import {
  createIsModalStore,
  createNavBarMenuStore,
  createUserNameStore,
} from "./store";

export function useEntryStore() {
  const hiddenModal = createIsModalStore((state) => state.hiddenModal);
  const [userName, setUserName] = createUserNameStore(
    useShallow((state) => [state.userName, state.setUserName])
  );
  return { state: { userName }, action: { hiddenModal, setUserName } };
}

export function useLayoutStore() {
  const musicBackGroundColor = createAudioStore(
    (state) => state.musicInfo.backGroundColor
  );
  const [isModal, hiddenModal, showModal] = createIsModalStore(
    useShallow((state) => [state.isModal, state.hiddenModal, state.showModal])
  );
  return {
    state: { isModal, musicBackGroundColor },
    action: { hiddenModal, showModal },
  };
}

export function usePlayerStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);
  return { state: { musicInfo } };
}

export function useNavBarStore() {
  const [activeMenu, setActiveMenu] = createNavBarMenuStore(
    useShallow((state) => [state.activeMenu, state.setActiveMenu])
  );
  return { state: { activeMenu }, action: { setActiveMenu } };
}
