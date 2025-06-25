import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import LyricsAndImage from "../components/pages/player/LyricsAndImage";
import { ProgressBar } from "../components/shared/ProgressBar";
import PlayerMenu from "../components/pages/player/PlayerMenu";
import styled from "styled-components";
import { useIsPlayerMenuStore } from "../store/player";
import PlayerHeader from "../components/pages/player/PlayerHeader";

export default function Player() {
  const isPlayerMenu = useIsPlayerMenuStore((state) => state.isPlayerMenu);

  return isPlayerMenu ? (
    <PlayerMenu />
  ) : (
    <Container>
      <PlayerHeader />
      <Content>
        <LyricsAndImage />
        <ProgressBar />
        <TimeStamp />
        <ControllerButtons />
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
