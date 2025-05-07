import { create } from "zustand";

type EntryModalState = {
  isShowEntryModal: boolean;
};

type EntryModalAction = {
  showEntryModal: () => void;
  hiddenEntryModal: () => void;
};

type EntryModalStore = EntryModalState & EntryModalAction;

export const useEntryModalStore = create<EntryModalStore>((set) => ({
  isShowEntryModal: false,
  showEntryModal: () => set(() => ({ isShowEntryModal: true })),
  hiddenEntryModal: () => set(() => ({ isShowEntryModal: false })),
}));
