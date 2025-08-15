import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";
import { useMutedStore } from "../../../store/player/useMutedStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useVolumeStore } from "../../../store/player/useVolumeStore";

export default function PlayerVolume() {
  const [isMuted, setIsMuted, toggleMuted] = useMutedStore(
    useShallow((state) => [state.isMuted, state.setIsMuted, state.toggleMuted])
  );

  const [volume, setVolume] = useVolumeStore(
    useShallow((state) => [state.volume, state.setVolume])
  );

  const [isShowVolumeBar, setIsShowVolumeBar] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);

  const timerIds = useRef<{
    showVolumeBar?: ReturnType<typeof setTimeout>;
    hideAnimation?: ReturnType<typeof setTimeout>;
  }>({});

  const prevVolume = useRef<number>(0);

  useEffect(() => {
    setIsMuted(volume === 0);
  }, [isMuted, volume]);

  const clearTimers = () => {
    if (timerIds.current.hideAnimation && timerIds.current.showVolumeBar) {
      Object.values(timerIds.current).forEach((timerId) =>
        clearTimeout(timerId)
      );
      timerIds.current = {};
    }
  };

  const startHideTimer = () => {
    clearTimers();
    timerIds.current.hideAnimation = setTimeout(
      () => setHideAnimation(true),
      1500
    );
    timerIds.current.showVolumeBar = setTimeout(
      () => setIsShowVolumeBar(false),
      1800
    );
  };

  const showVolumeBar = () => {
    clearTimers();
    setHideAnimation(false);
    setIsShowVolumeBar(true);
  };

  const resolvedVolumeIcon = isMuted
    ? faVolumeMute
    : volume > 50
      ? faVolumeHigh
      : faVolumeLow;

  const onClickVolumeIcon = () => {
    toggleMuted();
    if (volume > 0) {
      prevVolume.current = volume;
      setVolume(0);
    } else {
      setVolume(prevVolume.current);
    }
  };

  const onChangeVolumeRange = (e: ChangeEvent<HTMLInputElement>) =>
    setVolume(Number(e.currentTarget.value));

  return (
    <Container>
      <ButtonWrapper>
        <ButtonIcon
          onClick={onClickVolumeIcon}
          onMouseEnter={showVolumeBar}
          onMouseLeave={startHideTimer}
          ariaLabel="볼륨조절"
          icon={resolvedVolumeIcon}
        />
      </ButtonWrapper>
      {isShowVolumeBar && (
        <Input
          type="range"
          value={volume}
          hideAnimation={hideAnimation}
          onChange={onChangeVolumeRange}
          onMouseEnter={showVolumeBar}
          onMouseLeave={startHideTimer}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 125px;
  padding-left: 2px;
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 30px;
`;

const Input = styled.input.attrs<{ value: number; hideAnimation: boolean }>(
  ({ value }) => ({
    style: {
      background: `linear-gradient(to right, white ${
        (value / 100) * 100
      }%, #2A2A2A ${(value / 100) * 100}%)`,
    },
  })
)`
  height: 4px;
  appearance: none;
  cursor: pointer;
  animation: ${({ hideAnimation }) =>
      hideAnimation ? "hideVolumeBar" : "showVolumeBar"}
    0.5s forwards;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
  }

  @keyframes showVolumeBar {
    0% {
      width: 0px;
    }

    100% {
      width: 80px;
    }
  }

  @keyframes hideVolumeBar {
    0% {
      width: 80px;
    }
    100% {
      width: 0px;
    }
  }
`;
