import { create } from "zustand";

type AlertState = {
  text: string;
  show: boolean;
};

type AlertAction = {
  toggleFadeAlertMessage: (text: AlertState["text"]) => void;
};

type AlertStore = AlertState & AlertAction;

export const useAlertStore = create<AlertStore>((set) => {
  let timeoutId: NodeJS.Timeout;
  return {
    text: "",
    show: false,
    toggleFadeAlertMessage: (text) => {
      clearTimeout(timeoutId);
      set(() => ({ show: true, text }));
      timeoutId = setTimeout(() => set(() => ({ show: false })), 2000);
    },
  };
});
