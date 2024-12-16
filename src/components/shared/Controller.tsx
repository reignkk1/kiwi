import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import { useAudioStore } from "../../store";
import styled from "styled-components";

interface ControllerProps {
  width: number;
  size?: [number, number, number] | number;
}

export default function Controller({ width, size = 18 }: ControllerProps) {
  const isPlay = useAudioStore((state) => state.isPlay);
  const togglePlay = useAudioStore((state) => state.togglePlay);

  return (
    <Container width={width}>
      <ButtonIcon
        icon={faBackwardStep}
        size={typeof size === "number" ? size : size[0]}
      />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={() => togglePlay()}
        size={typeof size === "number" ? size : size[1]}
      />
      <ButtonIcon
        icon={faForwardStep}
        size={typeof size === "number" ? size : size[2]}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
