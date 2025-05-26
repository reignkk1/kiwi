import { create } from "zustand";
import { GenreType, MusicType } from "../../types";
import { getMusicDataFromGenre } from "../../utils";

type AlbumMusicListStore = {
  albumMusicList: Partial<Record<GenreType | "all", Array<MusicType>>>;
  setAlbumMusicList: (genreMenu: GenreType | "all") => void;
};

export const useAlbumMusicListStore = create<AlbumMusicListStore>((set) => ({
  albumMusicList: { all: getMusicDataFromGenre("all") },
  setAlbumMusicList: (genreMenu) => {
    set((state) => ({
      albumMusicList: {
        ...state.albumMusicList,
        [genreMenu]: getMusicDataFromGenre(genreMenu),
      },
    }));
  },
}));
