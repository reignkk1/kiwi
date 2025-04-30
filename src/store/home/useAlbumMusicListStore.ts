import { create } from "zustand";
import musicData from "../../musicData.json";
import { MusicType } from "../../types";

type AlbumMusicListStore = {
  albumMusicList: Array<MusicType>;
  setAlbumMusicListAll: () => void;
  filterAlbumMusicList: (activeGenreMenu: string) => void;
};

export const useAlbumMusicListStore = create<AlbumMusicListStore>((set) => ({
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
