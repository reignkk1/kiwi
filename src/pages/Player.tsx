import PlayerTimeStamp from "../components/pages/player/PlayerTimeStamp";
import PlayerControllerButtons from "../components/pages/player/PlayerControllerButtons";
import PlayerLyricsAndImage from "../components/pages/player/PlayerLyricsAndImage";
import { ProgressBar } from "../components/shared/ProgressBar";
import PlayerMenu from "../components/pages/player/PlayerMenu";
import styled from "styled-components";
import { useIsPlayerMenuStore } from "../store/player";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import PlayerVolume from "../components/pages/player/PlayerVolume";

export default function Player() {
  const isPlayerMenu = useIsPlayerMenuStore((state) => state.isPlayerMenu);

  return isPlayerMenu ? (
    <PlayerMenu />
  ) : (
    <div>
      <PlayerHeader />
      <Content>
        <PlayerLyricsAndImage />
        <PlayerVolume />
        <ProgressBar />
        <PlayerTimeStamp />
        <PlayerControllerButtons />
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
