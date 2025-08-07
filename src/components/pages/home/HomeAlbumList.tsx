import HomeAlbum from "./HomeAlbum";
import { useEffect } from "react";
import styled from "styled-components";
import {
  useActiveGenreMenuStore,
  useAlbumMusicListStore,
} from "../../../store/home";
import { useShallow } from "zustand/react/shallow";

export default function HomeAlbumList() {
  const activeMenu = useActiveGenreMenuStore((state) => state.activeMenu);
  const [albumMusicList, setAlbumMusicList] = useAlbumMusicListStore(
    useShallow((state) => [state.albumMusicList, state.setAlbumMusicList])
  );
  useEffect(() => {
    if (!albumMusicList[activeMenu]) {
      setAlbumMusicList(activeMenu);
    }
  }, [activeMenu, setAlbumMusicList, albumMusicList]);

  return (
    <Container>
      {albumMusicList[activeMenu]?.map((music) => (
        <HomeAlbum key={music.id} music={music} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow: auto;
  grid-gap: 10px;
`;
