import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import LyricsAndImage from "../components/pages/player/LyricsAndImage";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import { ProgressBar } from "../components/shared/ProgressBar";
import PlayerMenu from "../components/pages/player/PlayerMenu";
import styled from "styled-components";
import { useIsPlayerMenuStore } from "../store/player";

export default function Player() {
  const isPlayerMenu = useIsPlayerMenuStore((state) => state.isPlayerMenu);

  return isPlayerMenu ? (
    <PlayerMenu />
  ) : (
    <Container>
      <PlayerHeader />
      <LyricsAndImage />
      <ProgressBar />
      <TimeStamp />
      <ControllerButtons />
    </Container>
  );
}

const Container = styled.div`
  @media (max-height: 720px) {
    zoom: 0.9;
  }
`;
