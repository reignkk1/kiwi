import { faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";
import { useMutedStore } from "../../../store/player/useMutedStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    setIsMuted(volume === 0);
  }, [isMuted, volume]);

  const showVolumeBar = () => {
    clearTimers();
    setHideAnimation(false);
    setIsShowVolumeBar(true);
  };

  return (
    <Container>
      <ButtonWrapper>
        <ButtonIcon
          onClick={() => {
            toggleMuted();
            if (volume > 0) {
              prevVolume.current = volume;
              setVolume(0);
            } else {
              setVolume(prevVolume.current);
            }
            console.log(isMuted);
          }}
          onMouseEnter={showVolumeBar}
          onMouseLeave={startHideTimer}
          ariaLabel="볼륨조절"
          icon={isMuted ? faVolumeMute : faVolumeLow}
        />
      </ButtonWrapper>
      {isShowVolumeBar && (
        <Input
          type="range"
          value={volume}
          hideAnimation={hideAnimation}
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
