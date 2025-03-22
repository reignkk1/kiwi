import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import LyricsAndImage from "../components/pages/player/LyricsAndImage";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import { ProgressBar } from "../components/shared/ProgressBar";
import { createIsPlayerMenuStore } from "../components/pages/player/store";
import PlayerMenu from "../components/pages/player/PlayerMenu";
import styled from "styled-components";

export default function Player() {
  const isPlayerMenu = createIsPlayerMenuStore((state) => state.isPlayerMenu);

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

const Container = styled.div``;
