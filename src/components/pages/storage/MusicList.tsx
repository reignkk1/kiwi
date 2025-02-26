import musicData from "../../../musicData.json";
import { parserLocalStorage } from "parser-storages";
import MusicCard from "../../shared/MusicCard";
import { useMusicListStore } from "./hooks";
import styled from "styled-components";

export default function MusicList() {
  const {
    state: {
      musicInfo: { title },
    },
  } = useMusicListStore();

  const musicList = musicData.data.filter((music) =>
    parserLocalStorage.get("musicDrawer")?.some((id: number) => music.id === id)
  );

  return (
    <Container>
      {musicList.map((musicInfo) => {
        return (
          <List>
            <MusicCard
              musicInfo={musicInfo}
              mark={title}
              isMusicBar={musicInfo.title === title}
            />
          </List>
        );
      })}
    </Container>
  );
}

const Container = styled.ul`
  height: 560px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const List = styled.div`
  margin-bottom: 20px;
`;
