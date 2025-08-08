import { create } from "zustand";

type MutedStore = {
  isMuted: boolean;
  setIsMuted: (isMuted: MutedStore["isMuted"]) => void;
  toggleMuted: () => void;
};

export const useMutedStore = create<MutedStore>((set) => ({
  isMuted: false,
  setIsMuted: (isMuted) => set(() => ({ isMuted })),
  toggleMuted: () => set((prev) => ({ isMuted: !prev.isMuted })),
}));
