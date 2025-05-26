import { useShallow } from "zustand/react/shallow";
import { useActiveGenreMenuStore } from "../../store/home";
import { useAlbumMusicListStore } from "../../store/home/useAlbumMusicListStore";

export function useAlbumListStore() {
  const activeMenu = useActiveGenreMenuStore((state) => state.activeMenu);
  const [albumMusicList, setAlbumMusicList] = useAlbumMusicListStore(
    useShallow((state) => [state.albumMusicList, state.setAlbumMusicList])
  );

  return {
    state: { activeMenu, albumMusicList },
    action: { setAlbumMusicList },
  };
}
