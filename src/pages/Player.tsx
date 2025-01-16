import { useAudioStore, useIsExpandLyricsStore } from "../store";
import TimeStamp from "../components/pages/player/TimeStamp";
import Control from "../components/pages/player/Controller";
import Lyrics from "../components/pages/player/Lyrics";
import AlbumImg from "../components/shared/AlbumImg";
import PlayerHeader from "../components/pages/player/PlayerHeader";
import { useShallow } from "zustand/react/shallow";

export default function Player() {
  return (
    <div>
      <PlayerHeader />

      <Lyrics />
      <TimeStamp />
      <Control />
    </div>
  );
}
