import { useEntryModalStore, useUserNameStore } from "../../store/layout";

export function useEntryStore() {
  const hiddenModal = useEntryModalStore((state) => state.hiddenModal);
  const setUserName = useUserNameStore((state) => state.setUserName);
  return { action: { hiddenModal, setUserName } };
}
