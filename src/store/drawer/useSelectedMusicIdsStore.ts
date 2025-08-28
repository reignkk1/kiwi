import { create } from "zustand";

type SelectedMusicIds = {
  selectedMusicIds: Array<number>;
  setSelectedMusicIds: (
    selectedMusicIds: SelectedMusicIds["selectedMusicIds"]
  ) => void;
};

export const useSelectedMusicIdsStore = create<SelectedMusicIds>((set) => ({
  selectedMusicIds: [],
  setSelectedMusicIds: (selectedMusicIds) => set({ selectedMusicIds }),
}));
