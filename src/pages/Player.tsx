import TimeStamp from "../components/pages/player/TimeStamp";
import ControllerButtons from "../components/pages/player/ControllerButtons";
import LyricsAndImage from "../components/pages/player/LyricsAndImage";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import { ProgressBar } from "../components/shared/ProgressBar";

export default function Player() {
  return (
    <div>
      <PlayerHeader />
      <LyricsAndImage />
      <ProgressBar />
      <TimeStamp />
      <ControllerButtons />
    </div>
  );
}
