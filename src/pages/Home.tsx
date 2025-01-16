import styled from "styled-components";
import AlbumList from "../components/pages/home/AlbumList";
import GenreMenu from "../components/pages/home/GenreMenu";

export default function Home() {
  return (
    <Container>
      <GenreMenu />
      <AlbumList />
    </Container>
  );
}

const Container = styled.div``;
