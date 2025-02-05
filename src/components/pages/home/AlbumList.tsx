import Album from "./Album";
import { useEffect } from "react";
import styled from "styled-components";
import { useAlbumListStore } from "./hooks";

export default function AlbumList() {
  const {
    state: { activeGenreMenu, albumMusicList },
    action: { setAlbumMusicListAll, filterAlbumMusicList },
  } = useAlbumListStore();

  useEffect(() => {
    if (activeGenreMenu === "all") {
      setAlbumMusicListAll();
    } else {
      filterAlbumMusicList(activeGenreMenu);
    }
  }, [activeGenreMenu]);

  return (
    <Container>
      {albumMusicList.map((musicInfo) => (
        <Album musicInfo={musicInfo} />
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
