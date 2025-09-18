import styled from "styled-components";
import SelectButton from "./PlaylistSelectButton";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useSelectedMusicIndexStore } from "../../store/drawer";
import { useCurrentMusicStore } from "../../store/shared";
import usePlaylistStoreByPage from "../../hooks/usePlaylistStoreByPage";
import usePlaylistStoreByCategory from "../../hooks/usePlaylistStoreByCategory";
import { convertCategoryToKorean, getMusicDataFromId } from "../../utils";
import MusicCard from "./MusicCard";
import { useCurrentPlaylist } from "../../store/drawer/useCurrentPlaylist";

export default function PlaylistMusic() {
  const [selectedMusicIndex, setSelectedMusicIndex] =
    useSelectedMusicIndexStore(
      useShallow((state) => [
        state.selectedMusicIndex,
        state.setSelectedMusicIndex,
      ])
    );

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const storeByPage = usePlaylistStoreByPage();

  const storeByCategory = usePlaylistStoreByCategory();

  const currentPlaylist = useCurrentPlaylist((state) => state.currentPlaylist);

  const music = (
    storeByPage.category === "playList"
      ? storeByPage.playListIds
      : (storeByPage.playListIds[currentPlaylist] ?? [])
  ).map((id) => getMusicDataFromId(id));

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
  }, [setSelectedMusicIndex, storeByPage.category]);

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
                mark={
                  i === storeByPage.playingIndex
                    ? currentMusic.title
                    : undefined
                }
                onClick={() => {
                  storeByPage.setPlayingIndex(i);
                  storeByCategory.setPlayingIndex(i);
                }}
                $isMusicBar={i === storeByPage.playingIndex}
                $isAnimation={isActive(i) && (title.length || 0) > 20}
              />
            </List>
          );
        })
      ) : (
        <Wrapper>
          <span>{`${convertCategoryToKorean(storeByPage.category)}이 비어있습니다. `}</span>
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
