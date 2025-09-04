import styled from "styled-components";
import SelectCircle from "./DrawerSelectButton";
import { useSelectedMusicIndexStore } from "../../../store/drawer";
import { useShallow } from "zustand/react/shallow";
import usePlaylistResolver from "../../../hooks/usePlaylistResolver";

export default function DrawerTotalCount() {
  const { playListIds } = usePlaylistResolver();
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
      setSeletedMusicIds(playListIds.map((_, i) => i));
    }
  };

  const isActive = selectedMusicIds.length >= 1;

  return (
    <Container>
      <SelectCircle onClick={onClickSelectCircle} $active={isActive} />
      <span onClick={onClickSelectCircle}>
        {isActive ? "선택해제" : `${playListIds.length}곡`}
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
