import Album from "./Album";
import { useEffect } from "react";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import { useActiveGenreMenu, useAlbumMusicList } from "../../../store";

export default function AlbumList() {
  const activeGenreMenu = useActiveGenreMenu((state) => state.activeGenreMenu);
  const [albumMusicList, setAlbumMusicListAll, filterAlbumMusicList] =
    useAlbumMusicList(
      useShallow((state) => [
        state.albumMusicList,
        state.setAlbumMusicListAll,
        state.filterAlbumMusicList,
      ])
    );

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
