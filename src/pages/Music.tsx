import styled from "styled-components";
import MusicHeader from "../components/pages/music/MusicHeader";
import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";

export default function Music() {
  return (
    <Container>
      <MusicHeader />
      <MusicInfo />
      <MusicControllerButtons />
    </Container>
  );
}

const Container = styled.div``;
