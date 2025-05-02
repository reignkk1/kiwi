import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import styled from "styled-components";
import { is } from "../../utils";
import { useControllerStore } from "../../hooks/store/useControllerStore";

interface ControllerProps {
  width: number;
  size?: [number, number, number] | number | any;
}

export default function Controller({ width, size = 18 }: ControllerProps) {
  const {
    state: { isPlay, musicDrawer, currnetMusic },
    action: { toggleIsPlay, setPlayDirection, toggleFadeAlertMessage },
  } = useControllerStore();

  const isMusicDrawer = musicDrawer.length > 0;

  const handleMusicDrawerCheck = (direction: "next" | "prev") => {
    if (!isMusicDrawer) {
      return toggleFadeAlertMessage("음악서랍에 곡이 없습니다.");
    }

    setPlayDirection(direction);
  };

  const getSize = (index: number) => (is.number(size) ? size : size[index]);

  return (
    <Container width={width}>
      <ButtonIcon
        icon={faBackwardStep}
        size={getSize(0)}
        onClick={() => handleMusicDrawerCheck("prev")}
      />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={() => {
          // 만약 현재 곡이 지정되어 있지 않고 비어있을 경우
          // 플레이 버튼은 작동하지 않음.
          if (Object.keys(currnetMusic).length) {
            toggleIsPlay();
          }
        }}
        size={getSize(1)}
      />
      <ButtonIcon
        icon={faForwardStep}
        size={getSize(2)}
        onClick={() => handleMusicDrawerCheck("next")}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
