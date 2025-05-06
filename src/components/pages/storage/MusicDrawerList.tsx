import music from "../../../musicData.json";
import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import SelectButton from "./SelectButton";
import useMusicDrawerListStore from "../../../hooks/store/useMusicDrawerListStore";
import { useEffect } from "react";

export default function MusicDrawerList() {
  const {
    state: { musicDrawer, currentMusic, selectedMusicIds },
    action: { setSelectedMusicIds },
  } = useMusicDrawerListStore();

  const musicList = musicDrawer.map((id) =>
    music.data.find((music) => music.id === id)
  );

  const isActive = (musicId: number) => selectedMusicIds.includes(musicId);

  const onClickSelectCircle = (musicId: number) => {
    if (isActive(musicId)) {
      setSelectedMusicIds(selectedMusicIds.filter((id) => id !== musicId));
    } else {
      setSelectedMusicIds([...selectedMusicIds, musicId]);
    }
  };

  useEffect(() => {
    return () => setSelectedMusicIds([]);
  }, [setSelectedMusicIds]);

  return (
    <Container>
      {musicList.length ? (
        musicList.map((musicInfo) => (
          <List key={musicInfo!.id}>
            <SelectButton
              onClick={() => onClickSelectCircle(musicInfo!.id)}
              $active={isActive(musicInfo!.id)}
            />
            <MusicCard
              musicInfo={musicInfo!}
              mark={currentMusic.title}
              $isMusicBar={musicInfo!.title === currentMusic.title}
              $isAnimation={
                isActive(musicInfo!.id) && (musicInfo?.title.length || 0) > 20
              }
            />
          </List>
        ))
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
