import { create } from "zustand";

type VolumeStore = {
  volume: number;
  setVolume: (volume: VolumeStore["volume"]) => void;
};

export const useVolumeStore = create<VolumeStore>((set) => ({
  volume: 30,
  setVolume: (volume) => set(() => ({ volume })),
}));
