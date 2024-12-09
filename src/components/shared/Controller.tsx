import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import { useAudioStore } from "../../store";
import styled from "styled-components";

export default function Controller({ width }: { width: number }) {
  const isPlay = useAudioStore((state) => state.isPlay);
  const togglePlay = useAudioStore((state) => state.togglePlay);

  return (
    <Container width={width}>
      <ButtonIcon icon={faBackwardStep} />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={() => togglePlay()}
      />
      <ButtonIcon icon={faForwardStep} />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
