import { useShallow } from "zustand/react/shallow";
import { useActiveGenreMenuStore } from "../../store/home";
import { useAlbumMusicListStore } from "../../store/home/useAlbumMusicListStore";

export function useAlbumListStore() {
  const activeMenu = useActiveGenreMenuStore((state) => state.activeMenu);
  const [albumMusicList, setAlbumMusicListAll, filterAlbumMusicList] =
    useAlbumMusicListStore(
      useShallow((state) => [
        state.albumMusicList,
        state.setAlbumMusicListAll,
        state.filterAlbumMusicList,
      ])
    );

  return {
    state: { activeMenu, albumMusicList },
    action: { setAlbumMusicListAll, filterAlbumMusicList },
  };
}
