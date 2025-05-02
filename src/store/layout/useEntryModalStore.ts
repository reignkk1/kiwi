import { create } from "zustand";

type EntryModalState = {
  isModal: boolean;
};

type EntryModalAction = {
  showModal: () => void;
  hiddenModal: () => void;
};

type EntryModalStore = EntryModalState & EntryModalAction;

export const useEntryModalStore = create<EntryModalStore>((set) => ({
  isModal: false,
  showModal: () => set(() => ({ isModal: true })),
  hiddenModal: () => set(() => ({ isModal: false })),
}));
