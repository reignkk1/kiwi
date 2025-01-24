import { create } from "zustand";
import { IsLyricsClickedAction, IsLyricsClickedState } from "../../../types";

export const useIsLyricsClicked = create<
  IsLyricsClickedState & IsLyricsClickedAction
>((set) => ({
  isLyricsClicked: false,
  clickLyrics: () => {
    set(() => {
      return { isLyricsClicked: true };
    });
  },
}));
