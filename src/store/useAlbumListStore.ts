import { create } from "zustand";
import musicData from "../musicData.json";
import { MusicType } from "./../components/shared/types";

type AlbumListStore = {
  albumMusicList: Array<MusicType>;
  setAlbumMusicListAll: () => void;
  filterAlbumMusicList: (activeGenreMenu: string) => void;
};

export const useAlbumListStore = create<AlbumListStore>((set) => ({
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
