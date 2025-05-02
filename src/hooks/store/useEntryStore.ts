import { useShallow } from "zustand/react/shallow";
import { useEntryModalStore, useUserNameStore } from "../../store/layout";

export function useEntryStore() {
  const hiddenModal = useEntryModalStore((state) => state.hiddenModal);
  const [userName, setUserName] = useUserNameStore(
    useShallow((state) => [state.userName, state.setUserName])
  );
  return { state: { userName }, action: { hiddenModal, setUserName } };
}
