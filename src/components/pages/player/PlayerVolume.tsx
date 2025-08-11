import { faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";
import { useMutedStore } from "../../../store/player/useMutedStore";
import { useShallow } from "zustand/react/shallow";
import { useRef, useState } from "react";
import { useVolumeStore } from "../../../store/player/useVolumeStore";

export default function PlayerVolume() {
  const [isMuted, toggleMuted] = useMutedStore(
    useShallow((state) => [state.isMuted, state.toggleMuted])
  );

  const [volume, setVolume] = useVolumeStore(
    useShallow((state) => [state.volume, state.setVolume])
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
      <ButtonIcon
        onClick={() => toggleMuted()}
        onMouseEnter={showVolumeBar}
        onMouseLeave={startHideTimer}
        ariaLabel="볼륨조절"
        icon={isMuted ? faVolumeMute : faVolumeLow}
      />
      {isHover && (
        <Input
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.currentTarget.value))}
          onMouseEnter={showVolumeBar}
          onMouseLeave={startHideTimer}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 116px;
  padding-left: 2px;
`;

const Input = styled.input.attrs<{ value: number }>(({ value }) => ({
  style: {
    background: `linear-gradient(to right, white ${
      (value / 100) * 100
    }%, #2A2A2A ${(value / 100) * 100}%)`,
  },
}))`
  width: 80px;
  height: 4px;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
  }
`;
