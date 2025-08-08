import { faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";
import { useMutedStore } from "../../../store/player/useMutedStore";
import { useShallow } from "zustand/react/shallow";
import { useRef, useState } from "react";

export default function PlayerVolume() {
  const [isMuted, toggleMuted] = useMutedStore(
    useShallow((state) => [state.isMuted, state.toggleMuted])
  );

  const [isHover, setIsHover] = useState(false);

  const timeOutId = useRef<null | ReturnType<typeof setTimeout>>(null);

  const clearTimer = () => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
      timeOutId.current = null;
    }
  };

  const startHideTimer = () => {
    clearTimer();
    timeOutId.current = setTimeout(() => setIsHover(false), 2000);
  };

  const showVolumeBar = () => {
    clearTimer();
    setIsHover(true);
  };

  return (
    <Container>
      {isHover && (
        <Input
          type="range"
          onMouseEnter={showVolumeBar}
          onMouseLeave={startHideTimer}
        />
      )}
      <ButtonIcon
        onClick={() => toggleMuted()}
        onMouseEnter={showVolumeBar}
        onMouseLeave={startHideTimer}
        ariaLabel="볼륨조절"
        icon={isMuted ? faVolumeMute : faVolumeLow}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const Input = styled.input`
  width: 80px;
  transform: rotate(270deg);
  position: absolute;
  right: -28px;
  bottom: 60px;
`;
