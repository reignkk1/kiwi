import { create } from "zustand";

type ProgressState = {
  isExpandProgressBar: boolean;
  progressPercent: number;
  progressInputValue: number;
};

type ProgressAction = {
  setIsExpandProgressBar: (
    isExpand: ProgressState["isExpandProgressBar"]
  ) => void;
  setProgressPercent: (percent: ProgressState["progressPercent"]) => void;
  setProgressInputValue: (value: ProgressState["progressInputValue"]) => void;
};

type ProgressStore = ProgressState & ProgressAction;

export const useProgressStore = create<ProgressStore>((set) => ({
  isExpandProgressBar: false,
  progressPercent: 0,
  progressInputValue: 0,
  setIsExpandProgressBar: (isExpand) => set({ isExpandProgressBar: isExpand }),
  setProgressPercent: (percent) => set({ progressPercent: percent }),
  setProgressInputValue: (value) => set({ progressInputValue: value }),
}));
