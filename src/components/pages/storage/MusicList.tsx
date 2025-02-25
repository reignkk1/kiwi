import musicData from "../../../musicData.json";
import { parserLocalStorage } from "parser-storages";
import MusicCard from "../../shared/MusicCard";
import { useMusicListStore } from "./hooks";

export default function MusicList() {
  const {
    state: {
      musicInfo: { title },
    },
  } = useMusicListStore();

  const musicList = musicData.data.filter((music) =>
    parserLocalStorage.get("musicDrawer").some((id: number) => music.id === id)
  );

  return (
    <ul>
      {musicList.map((musicInfo) => {
        return (
          <li>
            <MusicCard musicInfo={musicInfo} mark={title} />
          </li>
        );
      })}
    </ul>
  );
}
