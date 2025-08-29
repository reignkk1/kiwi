import MusicCard from "../../shared/MusicCard";
import styled from "styled-components";
import SelectButton from "./DrawerSelectButton";
import { useEffect, useState } from "react";
import { getMusicDataFromId } from "../../../utils";
import { useCurrentMusicStore } from "../../../store/shared";
import { useSelectedMusicIdsStore } from "../../../store/drawer";
import { useShallow } from "zustand/react/shallow";
import usePlaylistContext from "../../../hooks/usePlaylistContext";

export default function DrawerMusicList() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const [selectedMusicIds, setSelectedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  const isActive = (musicId: number) => selectedMusicIds.includes(musicId);

  const { category, playListIds } = usePlaylistContext();

  const music = playListIds.map((id) => getMusicDataFromId(id));

  const [playingIndex, setPlayingIndex] = useState<number>();

  const onClickSelectCircle = (musicId: number) => {
    const selected = isActive(musicId)
      ? selectedMusicIds.filter((id) => id !== musicId)
      : [...selectedMusicIds, musicId];

    setSelectedMusicIds(selected);
  };

  console.log(playListIds);

  useEffect(() => {
    setSelectedMusicIds([]);
    return () => setSelectedMusicIds([]);
  }, [setSelectedMusicIds, playListIds]);

  return (
    <Container>
      {music.length ? (
        music.map((musicData, i) => {
          const { id, title } = musicData;
          return (
            <List key={i}>
              <SelectButton
                onClick={() => onClickSelectCircle(id)}
                $active={isActive(id)}
              />
              <MusicCard
                music={musicData}
                mark={i === playingIndex ? currentMusic.title : undefined}
                onClick={() => setPlayingIndex(i)}
                $isMusicBar={
                  i === playingIndex ? title === currentMusic.title : undefined
                }
                $isAnimation={isActive(id) && (title.length || 0) > 20}
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
