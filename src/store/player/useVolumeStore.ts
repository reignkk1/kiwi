import { create } from "zustand";

type VolumeStore = {
  volume: number;
  setVolume: (volume: VolumeStore["volume"]) => void;
};

export const useVolumeStore = create<VolumeStore>((set) => ({
  volume: 0.5,
  setVolume: (volume) => set(() => ({ volume })),
}));
