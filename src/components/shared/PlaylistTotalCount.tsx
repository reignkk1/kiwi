import styled from "styled-components";
import SelectCircle from "./PlaylistSelectButton";
import { useShallow } from "zustand/react/shallow";
import usePlaylistStoreByPage from "../../hooks/usePlaylistStoreByPage";
import { useSelectedMusicIndexStore } from "../../store/drawer";
import { useCurrentPlaylist } from "../../store/drawer/useCurrentPlaylist";

export default function PlaylistTotalCount() {
  const storeByPage = usePlaylistStoreByPage();
  const currentPlaylist = useCurrentPlaylist((state) => state.currentPlaylist);
  const [selectedMusicIds, setSeletedMusicIds] = useSelectedMusicIndexStore(
    useShallow((state) => [
      state.selectedMusicIndex,
      state.setSelectedMusicIndex,
    ])
  );

  const onClickSelectCircle = () => {
    if (selectedMusicIds.length) {
      setSeletedMusicIds([]);
    } else {
      setSeletedMusicIds(
        storeByPage.category === "drawer"
          ? storeByPage.playListIds[currentPlaylist].map((_, i) => i)
          : storeByPage.playListIds.map((_, i) => i)
      );
    }
  };

  const isActive = selectedMusicIds.length >= 1;

  return (
    <Container>
      <SelectCircle onClick={onClickSelectCircle} $active={isActive} />
      <span onClick={onClickSelectCircle}>
        {isActive
          ? "선택해제"
          : `${
              (storeByPage.category === "drawer"
                ? storeByPage.playListIds[currentPlaylist]
                : storeByPage.playListIds
              ).length
            }곡`}
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  color: white;
`;
