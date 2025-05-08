import { useParams } from "react-router-dom";
import music from "../musicData.json";

export default function useGetMusicInfoById() {
  const { id } = useParams();

  const musicInfo = music.data.find((data) => data.id === Number(id));

  return musicInfo;
}
