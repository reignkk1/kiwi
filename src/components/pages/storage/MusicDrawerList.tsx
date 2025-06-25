import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import SelectButton from "./SelectButton";
import useMusicDrawerListStore from "../../../hooks/store/useMusicDrawerListStore";
import { useEffect } from "react";
import { getMusicDataFromId } from "../../../utils";

export default function MusicDrawerList() {
  const {
    state: { musicDrawer, currentMusic, selectedMusicIds },
    action: { setSelectedMusicIds },
  } = useMusicDrawerListStore();

  const music = musicDrawer.map((id) => getMusicDataFromId(id));

  const isActive = (musicId: number) => selectedMusicIds.includes(musicId);

  const onClickSelectCircle = (musicId: number) => {
    const selected = isActive(musicId)
      ? selectedMusicIds.filter((id) => id !== musicId)
      : [...selectedMusicIds, musicId];

    setSelectedMusicIds(selected);
  };

  useEffect(() => {
    return () => setSelectedMusicIds([]);
  }, [setSelectedMusicIds]);

  return (
    <Container>
      {music.length ? (
        music.map((musicData) => {
          const { id, title } = musicData;
          return (
            <List key={id}>
              <SelectButton
                onClick={() => onClickSelectCircle(id)}
                $active={isActive(id)}
              />
              <MusicCard
                music={musicData}
                mark={currentMusic.title}
                $isMusicBar={title === currentMusic.title}
                $isAnimation={isActive(id) && (title.length || 0) > 20}
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
  width: 250px;
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
