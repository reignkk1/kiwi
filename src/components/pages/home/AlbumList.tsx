import Album from "./Album";
import { useEffect } from "react";
import styled from "styled-components";
import { useAlbumListStore } from "../../../hooks/store/useAlbumListStore";

export default function AlbumList() {
  const {
    state: { activeMenu, albumMusicList },
    action: { setAlbumMusicList },
  } = useAlbumListStore();

  useEffect(() => {
    if (!albumMusicList[activeMenu]) {
      setAlbumMusicList(activeMenu);
    }
  }, [activeMenu, setAlbumMusicList]);

  return (
    <Container>
      {albumMusicList[activeMenu]?.map((music) => (
        <Album key={music.id} music={music} />
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
