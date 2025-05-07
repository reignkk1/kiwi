import { useEntryModalStore, useUserNameStore } from "../../store/layout";

export function useEntryStore() {
  const hiddenEntryModal = useEntryModalStore(
    (state) => state.hiddenEntryModal
  );
  const setUserName = useUserNameStore((state) => state.setUserName);
  return { action: { hiddenEntryModal, setUserName } };
}
