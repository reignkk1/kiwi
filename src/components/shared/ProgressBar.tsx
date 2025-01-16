import styled from "styled-components";
import {
  useAudioStore,
  useIsExpandStore,
  useProgressInputStore,
} from "../../store";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  convertFromPercentToTime,
  convertTime,
  getProgressPercent,
} from "../../utils";
import { Progress } from "./Progress";

export function ProgressBar({ disabled = false }: { disabled?: boolean }) {
  const [audio, progressPercent, setProgressPercent] = useAudioStore(
    useShallow((state) => [
      state.audio,
      state.progressPercent,
      state.setProgressPercent,
    ])
  );

  const [isExpand, setIsExpand] = useIsExpandStore(
    useShallow((state) => [state.isExpand, state.setIsExpand])
  );

  const [progressInputValue, setProgressInputValue] = useProgressInputStore(
    useShallow((state) => [
      state.progressInputValue,
      state.setProgressInputValue,
    ])
  );

  const isClicked = useRef<boolean>(false);

  const updateProgressPercent = () =>
    setProgressPercent(
      getProgressPercent(audio.currentTime, audio.duration) || 0
    );

  useEffect(() => {
    audio.ontimeupdate = updateProgressPercent;
  }, []);

  return (
    <Container>
      {!disabled && (
        <ExpandTime>
          {isExpand && (
            <span>
              {convertTime(
                convertFromPercentToTime(audio.duration, progressInputValue)
              )}
            </span>
          )}
        </ExpandTime>
      )}
      <Input
        type="range"
        max={100}
        step={1}
        value={progressInputValue}
        disabled={disabled}
        onChange={(e) => {
          setProgressInputValue(Math.floor(Number(e.currentTarget.value)));
        }}
        onClick={() => {
          audio.currentTime = convertFromPercentToTime(
            audio.duration,
            progressInputValue
          );
        }}
        onMouseDown={() => {
          isClicked.current = true;
        }}
        onMouseMove={() => {
          if (isClicked.current) {
            setIsExpand(true);
          }
        }}
        onMouseUp={() => {
          isClicked.current = false;
          setIsExpand(false);
          setProgressPercent(0);
        }}
      />

      <Progress
        isExpand={isExpand}
        progressPercent={isExpand ? progressInputValue : progressPercent}
      />
    </Container>
  );
}

// 리팩토링 하기 => 공통되는 것들 다시 뽑기, 변수명, 추상화
// 새로고침하고 재생하면 레이아웃이 약간 올라가는 현상

const Container = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 15px;
  bottom: -8px;
  right: -1px;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1px;
    height: 0.1px;
  }
`;

const ExpandTime = styled.div`
  height: 15px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
`;
