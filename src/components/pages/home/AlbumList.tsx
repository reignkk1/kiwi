import Album from "./Album";
import { useEffect } from "react";
import styled from "styled-components";
import { useAlbumListStore } from "../../../hooks/store/useAlbumListStore";

export default function AlbumList() {
  const {
    state: { activeMenu, albumMusicList },
    action: { setAlbumMusicListAll, filterAlbumMusicList },
  } = useAlbumListStore();

  useEffect(() => {
    activeMenu === "all"
      ? setAlbumMusicListAll()
      : filterAlbumMusicList(activeMenu);
  }, [activeMenu, setAlbumMusicListAll, filterAlbumMusicList]);

  return (
    <Container>
      {albumMusicList.map((musicInfo) => (
        <Album key={musicInfo.id} musicInfo={musicInfo} />
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
