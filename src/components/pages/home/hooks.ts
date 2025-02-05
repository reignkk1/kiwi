import { useShallow } from "zustand/react/shallow";
import { createActiveGenreMenuStore, createAlbumMusicListStore } from "./store";

export function useAlbumListStore() {
  const activeGenreMenu = createActiveGenreMenuStore(
    (state) => state.activeGenreMenu
  );
  const [albumMusicList, setAlbumMusicListAll, filterAlbumMusicList] =
    createAlbumMusicListStore(
      useShallow((state) => [
        state.albumMusicList,
        state.setAlbumMusicListAll,
        state.filterAlbumMusicList,
      ])
    );

  return {
    state: { activeGenreMenu, albumMusicList },
    action: { setAlbumMusicListAll, filterAlbumMusicList },
  };
}

export function useGenreMenuStore() {
  const [activeGenreMenu, setActiveGenreMenu] = createActiveGenreMenuStore(
    useShallow((state) => [state.activeGenreMenu, state.setActiveGenreMenu])
  );
  return { state: { activeGenreMenu }, action: { setActiveGenreMenu } };
}
