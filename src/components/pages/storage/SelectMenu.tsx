import styled from "styled-components";
import { palette } from "../../../constant";
import { useSelectedMusicIdsStore } from "../../../store/storage";

// 선택을 했을 때 나오는 메뉴에는 삭제, 선택반복, 담기
// 일단 삭제 버튼만 만들어보기

export default function SelectMenu() {
  const selectedMusicIds = useSelectedMusicIdsStore(
    (state) => state.selectedMusicIds
  );

  const isSelected = selectedMusicIds.length > 0;
  return <Container $isSelected={isSelected}></Container>;
}

const Container = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  height: 40px;
  background-color: ${palette.signatureColor};
  position: absolute;
  bottom: 50px;
  animation: ${({ $isSelected }) => ($isSelected ? "fade-in" : "fade-out")} 0.5s
    forwards;

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
