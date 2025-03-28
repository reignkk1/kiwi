import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import styled from "styled-components";
import { useControllerStore } from "./hooks";
import { musicDrawerStorage } from "../../lib/localStorage";

interface ControllerProps {
  width: number;
  size?: [number, number, number] | number;
}

export default function Controller({ width, size = 18 }: ControllerProps) {
  const {
    state: { isPlay },
    action: { toggleIsPlay, setAction, toggleFadeAlertMessage },
  } = useControllerStore();

  const { get: getMusicDrawerStorage } = musicDrawerStorage;
  const isMusicDrawer =
    (getMusicDrawerStorage("musicDrawer") as number[]).length > 0;

  return (
    <Container width={width}>
      <ButtonIcon
        icon={faBackwardStep}
        size={typeof size === "number" ? size : size[0]}
        onClick={() => {
          if (!isMusicDrawer) {
            return toggleFadeAlertMessage("음악서랍에 곡이 없습니다.");
          }

          setAction("playPrev");
        }}
      />
      <ButtonIcon
        icon={isPlay ? faPause : faPlay}
        onClick={toggleIsPlay}
        size={typeof size === "number" ? size : size[1]}
      />
      <ButtonIcon
        icon={faForwardStep}
        size={typeof size === "number" ? size : size[2]}
        onClick={() => {
          if (!isMusicDrawer) {
            return toggleFadeAlertMessage("음악서랍에 곡이 없습니다.");
          }

          setAction("playNext");
        }}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
