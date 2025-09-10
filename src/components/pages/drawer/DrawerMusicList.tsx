import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import SelectButton from "./DrawerSelectButton";
import { useEffect } from "react";
import { getMusicDataFromId } from "../../../utils";
import { useCurrentMusicStore } from "../../../store/shared";
import { useSelectedMusicIndexStore } from "../../../store/drawer";
import { useShallow } from "zustand/react/shallow";
import usePlayinglistResolver from "../../../hooks/usePlaylistStoreByCategory";
import usePlaylistResolver from "../../../hooks/usePlaylistStoreByPage";

export default function DrawerMusicList() {
  const [selectedMusicIndex, setSelectedMusicIndex] =
    useSelectedMusicIndexStore(
      useShallow((state) => [
        state.selectedMusicIndex,
        state.setSelectedMusicIndex,
      ])
    );

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const { playListIds, playingIndex, setPlayingIndex, category } =
    usePlaylistResolver();

  const { setPlayingIndex: setCurrentPlayingIndex } = usePlayinglistResolver();

  const music = playListIds.map((id) => getMusicDataFromId(id));
  const isActive = (index: number) => selectedMusicIndex.includes(index);

  const onClickSelectCircle = (index: number) => {
    const selected = isActive(index)
      ? selectedMusicIndex.filter((id) => id !== index)
      : [...selectedMusicIndex, index];

    setSelectedMusicIndex(selected);
  };

  useEffect(() => {
    setSelectedMusicIndex([]);
    return () => setSelectedMusicIndex([]);
  }, [setSelectedMusicIndex, category]);

  return (
    <Container>
      {music.length ? (
        music.map((musicData, i) => {
          const { title } = musicData;
          return (
            <List key={i}>
              <SelectButton
                onClick={() => onClickSelectCircle(i)}
                $active={isActive(i)}
              />
              <MusicCard
                music={musicData}
                mark={i === playingIndex ? currentMusic.title : undefined}
                onClick={() => {
                  setPlayingIndex(i);
                  setCurrentPlayingIndex(i);
                }}
                $isMusicBar={i === playingIndex}
                $isAnimation={isActive(i) && (title.length || 0) > 20}
              />
            </List>
          );
        })
      ) : (
        <Wrapper>
          <span>{`${category}이 비어있습니다. `}</span>
        </Wrapper>
      )}
    </Container>
  );
}

// 설계 다시하기 이거 상태설계부터 해야할듯

const Container = styled.ul`
  height: 560px;
  padding-bottom: 50px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
    display: none;
  }
`;

const List = styled.li`
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
