import styled from "styled-components";
import SelectCircle from "./DrawerSelectButton";
import {
  useMusicDrawerStore,
  useSelectedMusicIdsStore,
} from "../../../store/storage";
import { useShallow } from "zustand/react/shallow";

export default function DrawerTotalCount() {
  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);
  const [selectedMusicIds, setSeletedMusicIds] = useSelectedMusicIdsStore(
    useShallow((state) => [state.selectedMusicIds, state.setSelectedMusicIds])
  );

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
