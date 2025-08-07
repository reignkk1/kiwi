import PlayerTimeStamp from "../components/pages/player/PlayerTimeStamp";
import PlayerControllerButtons from "../components/pages/player/PlayerControllerButtons";
import PlayerLyricsAndImage from "../components/pages/player/PlayerLyricsAndImage";
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
        <PlayerLyricsAndImage />
        <ProgressBar />
        <PlayerTimeStamp />
        <PlayerControllerButtons />
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
