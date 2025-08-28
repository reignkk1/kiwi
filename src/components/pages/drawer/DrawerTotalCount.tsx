import styled from "styled-components";
import SelectCircle from "./DrawerSelectButton";
import { useSelectedMusicIdsStore } from "../../../store/drawer";
import { useShallow } from "zustand/react/shallow";
import useResolvedPlayListIds from "../../../hooks/useResolvedPlayListIds";

export default function DrawerTotalCount() {
  const { playListIds } = useResolvedPlayListIds();
  const [selectedMusicIds, setSeletedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

  const onClickSelectCircle = () => {
    if (selectedMusicIds.length) {
      setSeletedMusicIds([]);
    } else {
      setSeletedMusicIds([...playListIds]);
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
