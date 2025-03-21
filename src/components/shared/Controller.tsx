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
    state: { isPlay },
    action: { toggleIsPlay, setAction },
  } = useControllerStore();

  return (
    <Container width={width}>
      <ButtonIcon
        icon={faBackwardStep}
        size={typeof size === "number" ? size : size[0]}
        onClick={() => setAction("playPrev")}
      />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={toggleIsPlay}
        size={typeof size === "number" ? size : size[1]}
      />
      <ButtonIcon
        icon={faForwardStep}
        size={typeof size === "number" ? size : size[2]}
        onClick={() => setAction("playNext")}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
