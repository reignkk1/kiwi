import { create } from "zustand";

interface ProgressInputValueStore {
  progressInputValue: number;
  setProgressInputValue: (
    progressInputValue: ProgressInputValueStore["progressInputValue"]
  ) => void;
}

interface IsExpandProgressBarStore {
  isExpandProgressBar: boolean;
  setIsExpandProgressBar: (
    isExpand: IsExpandProgressBarStore["isExpandProgressBar"]
  ) => void;
}

interface AlertMessageStore {
  alertMessageText: string;
  show: boolean;
  toggleFadeAlertMessage: (text: AlertMessageStore["alertMessageText"]) => void;
}

export const createProgressInputStore = create<ProgressInputValueStore>(
  (set) => ({
    progressInputValue: 0,
    setProgressInputValue: (progressInputValue) =>
      set(() => ({ progressInputValue })),
  })
);

export const createIsExpandProgressBarStore = create<IsExpandProgressBarStore>(
  (set) => ({
    isExpandProgressBar: false,
    setIsExpandProgressBar: (isExpandProgressBar) =>
      set(() => ({ isExpandProgressBar })),
  })
);

export const createAlertMessageStore = create<AlertMessageStore>((set) => {
  let timeoutId: NodeJS.Timeout;
  return {
    alertMessageText: "",
    show: false,
    toggleFadeAlertMessage: (text) => {
      clearTimeout(timeoutId);
      set(() => ({ show: true, alertMessageText: text }));
      timeoutId = setTimeout(() => set(() => ({ show: false })), 2000);
    },
  };
});
