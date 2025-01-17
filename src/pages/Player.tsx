import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import Lyrics from "../components/pages/player/Lyrics";
import PlayerHeader from "../components/pages/player/PlayerHeader";

export default function Player() {
  return (
    <div>
      <PlayerHeader />
      <Lyrics />
      <TimeStamp />
      <ControllerButtons />
    </div>
  );
}
