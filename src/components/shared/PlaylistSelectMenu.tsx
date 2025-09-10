import styled from "styled-components";
import { useSelectedMusicIndexStore } from "../../store/drawer";
import { useInformModalStore } from "../../store/layout/useInfoModalStore";
import { palette } from "../../constant";

// 선택을 했을 때 나오는 메뉴에는 삭제, 선택반복, 담기

export default function PlaylistSelectMenu() {
  const selectedMusicIndex = useSelectedMusicIndexStore(
    (state) => state.selectedMusicIndex
  );

  const setIsShowInformModal = useInformModalStore(
    (state) => state.setIsShowInformModal
  );

  const isSelected = selectedMusicIndex.length > 0;

  const onClick = () => setIsShowInformModal(true);

  return (
    <Container onClick={onClick} $isSelected={isSelected}>
      <Text>🗑️ 삭제</Text>
      <Count>{selectedMusicIndex.length}</Count>
    </Container>
  );
}

const Container = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  height: 40px;
  background-color: ${palette.signatureColor};
  position: absolute;
  bottom: 50px;
  animation: ${({ $isSelected }) => ($isSelected ? "fade-in" : "fade-out")} 0.5s
    forwards;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  gap: 10px;

  @keyframes fade-in {
    0% {
    }
    100% {
      transform: translate(0, -50px);
    }
  }

  @keyframes fade-out {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const Text = styled.span`
  font-size: 16px;
`;

const Count = styled.span`
  padding: 3px 8px;
  background-color: white;
  color: ${palette.signatureColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
`;
