import { create } from "zustand";
import { getMusicDataFromId } from "../../utils";
import { MusicType } from "../../types";

type MusicDataFromId = {
  music: MusicType | null;
  getMusicDataFromId: (id?: string | number) => void;
};

export const useMusicDataFromId = create<MusicDataFromId>((set) => ({
  music: null,
  getMusicDataFromId: (id) => {
    const data = getMusicDataFromId(id);
    return set({ music: data });
  },
}));
