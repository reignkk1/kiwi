import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import styled from "styled-components";
import { useControllerStore } from "./hooks";

interface ControllerProps {
  width: number;
  size?: [number, number, number] | number;
}

export default function Controller({ width, size = 18 }: ControllerProps) {
  const {
    state: { isPlay, isShuffle },
    action: { togglePlay },
  } = useControllerStore();

  return (
    <Container width={width}>
      <ButtonIcon
        icon={faBackwardStep}
        size={typeof size === "number" ? size : size[0]}
      />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={togglePlay}
        size={typeof size === "number" ? size : size[1]}
      />
      <ButtonIcon
        icon={faForwardStep}
        size={typeof size === "number" ? size : size[2]}
      />
    </Container>
  );
}

// shuffle 상태에 따라서 다음곡, 이전곡 클릭 시 로직 구현

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
