import { create } from "zustand";
import musicData from "../../../musicData.json";
import { MusicType } from "../../shared/types";

interface ActiveGenreMenuStore {
  activeGenreMenu: string;
  setActiveGenreMenu: (
    genreMenu: ActiveGenreMenuStore["activeGenreMenu"]
  ) => void;
}

export interface AlbumMusicListStore {
  albumMusicList: MusicType[];
  setAlbumMusicListAll: () => void;
  filterAlbumMusicList: (activeGenreMenu: string) => void;
}

export const createActiveGenreMenuStore = create<ActiveGenreMenuStore>(
  (set) => ({
    activeGenreMenu: "all",
    setActiveGenreMenu: (genreMenu) =>
      set(() => ({ activeGenreMenu: genreMenu })),
  })
);

export const createAlbumMusicListStore = create<AlbumMusicListStore>((set) => ({
  albumMusicList: [],
  setAlbumMusicListAll: () => set(() => ({ albumMusicList: musicData.data })),
  filterAlbumMusicList: (activeGenreMenu) => {
    set(() => ({
      albumMusicList: musicData.data.filter(
        ({ genre }) => genre === activeGenreMenu
      ),
    }));
  },
}));
