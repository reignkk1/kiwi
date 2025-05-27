import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";
import MusicLyrics from "../components/pages/music/MusicLyrics";
import { useMusicDataFromId } from "../store/music/useMusicDataFromId";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicCredit from "../components/pages/music/MusicCredit";
import ScrollTitleLayout from "../components/layout/ScrollTitleLayout";

export default function Music() {
  const { id } = useParams();

  const getMusicDataFromId = useMusicDataFromId(
    (state) => state.getMusicDataFromId
  );
  const music = useMusicDataFromId((state) => state.music);

  useEffect(() => {
    if (id) getMusicDataFromId(id);
  }, [id]);

  return (
    <ScrollTitleLayout title={music?.title}>
      <MusicInfo />
      <MusicControllerButtons />
      <MusicLyrics />
      <MusicCredit />
    </ScrollTitleLayout>
  );
}
