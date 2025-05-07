import { create } from "zustand";

type InformModalStore = {
  isShowInformModal: boolean;
  informModalContent: string;
  setIsShowInformModal: (
    isShowInformModal: InformModalStore["isShowInformModal"]
  ) => void;
  setInformModalContent: (
    informModalContent: InformModalStore["informModalContent"]
  ) => void;
};

export const useInformModalStore = create<InformModalStore>((set) => ({
  isShowInformModal: false,
  informModalContent: "",
  setIsShowInformModal: (isShowInformModal) => set({ isShowInformModal }),
  setInformModalContent: (informModalContent) => set({ informModalContent }),
}));
