import styled from "styled-components";
import SelectCircle from "./SelectButton";
import useTotalCountStore from "../../../hooks/store/useTotalCountStore";

export default function TotalCount() {
  const {
    state: { musicDrawer, selectedMusicIds },
    action: { setSeletedMusicIds },
  } = useTotalCountStore();

  const onClickSelectCircle = () => {
    if (selectedMusicIds.length) {
      setSeletedMusicIds([]);
    } else {
      setSeletedMusicIds([...musicDrawer]);
    }
  };

  const isActive = selectedMusicIds.length >= 1;

  return (
    <Container>
      <SelectCircle onClick={onClickSelectCircle} $active={isActive} />
      <span onClick={onClickSelectCircle}>
        {isActive ? "선택해제" : `${musicDrawer.length}곡`}
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
