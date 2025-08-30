import { create } from "zustand";

type SelectedMusicIndex = {
  selectedMusicIndex: Array<number>;
  setSelectedMusicIndex: (
    selectedMusicIds: SelectedMusicIndex["selectedMusicIndex"]
  ) => void;
};

export const useSelectedMusicIndexStore = create<SelectedMusicIndex>((set) => ({
  selectedMusicIndex: [],
  setSelectedMusicIndex: (selectedMusicIndex) => set({ selectedMusicIndex }),
}));
