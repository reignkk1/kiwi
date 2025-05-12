import styled from "styled-components";
import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";
import MusicHeader from "../components/pages/music/MusicHeader";
import MusicLyrics from "../components/pages/music/MusicLyrics";

export default function Music() {
  return (
    <Container>
      <MusicHeader />
      <MusicInfo />
      <MusicControllerButtons />
      <MusicLyrics />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
