import styled from "styled-components";
import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";
import MusicHeader from "../components/pages/music/MusicHeader";

export default function Music() {
  return (
    <Container>
      <MusicHeader />
      <MusicInfo />
      <MusicControllerButtons />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
`;
