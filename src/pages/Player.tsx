import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import Lyrics from "../components/pages/player/Lyrics";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import { ProgressBar } from "../components/shared/ProgressBar";

export default function Player() {
  return (
    <div>
      <PlayerHeader />
      <Lyrics />
      <ProgressBar />
      <TimeStamp />
      <ControllerButtons />
    </div>
  );
}
