import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import SelectButton from "./DrawerSelectButton";
import { useEffect } from "react";
import { getMusicDataFromId } from "../../../utils";
import { useCurrentMusicStore } from "../../../store/shared";
import { useSelectedMusicIndexStore } from "../../../store/drawer";
import { useShallow } from "zustand/react/shallow";
import usePlaylistContext from "../../../hooks/usePlaylistContext";
import { usePlayingIndexStore } from "../../../store/drawer/usePlayingIndexStore";

export default function DrawerMusicList() {
  const [selectedMusicIndex, setSelectedMusicIndex] =
    useSelectedMusicIndexStore(
      useShallow((state) => [
        state.selectedMusicIndex,
        state.setSelectedMusicIndex,
      ])
    );

  const [playingIndex, setPlayingIndex] = usePlayingIndexStore(
    useShallow((state) => [state.playingIndex, state.setPlayingIndex])
  );

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);
  const { category, playListIds } = usePlaylistContext();

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
                onClick={() => setPlayingIndex(i)}
                $isMusicBar={
                  i === playingIndex ? title === currentMusic.title : undefined
                }
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
