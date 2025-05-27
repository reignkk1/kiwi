import { useEffect } from "react";
import ScrollTitleLayout from "../components/layout/ScrollTitleLayout";
import { useParams } from "react-router-dom";
import { useMusicDataFromId } from "../store/music/useMusicDataFromId";
import AlbumImg from "./../components/shared/AlbumImg";

export default function AlbumIntro() {
  const { id } = useParams();

  const getMusicDataFromId = useMusicDataFromId(
    (state) => state.getMusicDataFromId
  );
  const music = useMusicDataFromId((state) => state.music);

  useEffect(() => {
    if (id) getMusicDataFromId(id);
  }, [id]);

  return (
    <ScrollTitleLayout title={music?.albumTitle}>
      <AlbumImg music={music!} size="smallLarge" />
    </ScrollTitleLayout>
  );
}
