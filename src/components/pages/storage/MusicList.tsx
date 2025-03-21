import music from "../../../musicData.json";
import MusicCard from "../../shared/MusicCard";
import { useMusicListStore } from "./hooks";
import styled from "styled-components";
import { musicDrawerStorage } from "../../../lib/localStorage";

export default function MusicList() {
  const {
    state: {
      musicInfo: { title },
    },
  } = useMusicListStore();

  const { get: getMusicDrawerStorage } = musicDrawerStorage;

  const musicList = (
    getMusicDrawerStorage("musicDrawer") as Array<string | number>
  ).map((id) => music.data.find((music) => music.id === id));

  return (
    <Container>
      {musicList.length ? (
        musicList.map((musicInfo) => {
          return (
            <List>
              <MusicCard
                musicInfo={musicInfo!}
                mark={title}
                isMusicBar={musicInfo!.title === title}
              />
            </List>
          );
        })
      ) : (
        <Wrapper>
          <span>음악서랍이 비어있습니다.</span>
        </Wrapper>
      )}
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

const Wrapper = styled.div`
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  font-weight: bold;
  font-size: 16px;
`;
