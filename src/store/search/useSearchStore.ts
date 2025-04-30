import { create } from "zustand";
import musicData from "../../musicData.json";
import { MusicType } from "../../types";

type SearchStore = {
  searchKeyWord: string;
  searchResultMusic: Array<MusicType>;
  setSearchKeyWord: (keyWord: SearchStore["searchKeyWord"]) => void;
  searchMusic: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchKeyWord: "",
  searchResultMusic: [],
  setSearchKeyWord: (keyWord) => set(() => ({ searchKeyWord: keyWord })),
  searchMusic: () =>
    set((state) => {
      if (!state.searchKeyWord) {
        return { searchResultMusic: [] };
      }

      const result = musicData.data.filter(({ title, singer }) => {
        const getCleanedString = (letter: string) =>
          letter.replaceAll(" ", "").toLowerCase();

        const isIncludesKeyword = (letter: string) =>
          getCleanedString(letter).includes(
            getCleanedString(state.searchKeyWord)
          );

        return isIncludesKeyword(title) || isIncludesKeyword(singer);
      });

      return { searchResultMusic: result };
    }),
}));
