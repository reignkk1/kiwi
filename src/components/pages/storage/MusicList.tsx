import music from "../../../musicData.json";
import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import { useCurrentMusicStore } from "../../../store/shared";
import useMusicDrawerStorage from "../../../hooks/localStorage/useMusicDrawerStorage";

export default function MusicList() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const { musicDrawer } = useMusicDrawerStorage();

  const musicList = musicDrawer.map((id) =>
    music.data.find((music) => music.id === id)
  );

  return (
    <Container>
      {musicList.length ? (
        musicList.map((musicInfo) => {
          return (
            <List>
              <MusicCard
                musicInfo={musicInfo!}
                mark={currentMusic.title}
                $isMusicBar={musicInfo!.title === currentMusic.title}
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
