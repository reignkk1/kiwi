import styled from "styled-components";
import { ProgressVisual } from "./ProgressVisual";
import { useRef } from "react";
import { convertFromPercentToTime, convertTime } from "../../utils";
import { useProgressBarStore } from "../../hooks/store/useProgressBarStore";

export function ProgressBar({ disabled = false }: { disabled?: boolean }) {
  const {
    state: {
      duration,
      isExpandProgressBar,
      progressInputValue,
      progressPercent,
    },
    action: {
      setIsExpandProgressBar,
      setProgressInputValue,
      setProgressPercent,
      setCurrentTime,
      setPressedInputValue,
    },
  } = useProgressBarStore();

  const isClicked = useRef<boolean>(false);

  const pressAndUp = () => {
    // 확대 기능 off
    setIsExpandProgressBar(false);

    // 퍼센트 게이지 초기화
    setProgressPercent(0);

    // 눌렀다 뗀 위치로 이동
    setCurrentTime(convertFromPercentToTime(duration, progressInputValue));

    // 눌렀다 뗀 시점의 위치 value 상태 업뎃
    setPressedInputValue(progressInputValue);
  };

  return (
    <Container>
      <ExpandTime>
        {isExpandProgressBar && (
          <span>
            {convertTime(
              convertFromPercentToTime(duration, progressInputValue)
            )}
          </span>
        )}
      </ExpandTime>
      <Input
        type="range"
        max={100}
        step={1}
        value={progressInputValue}
        disabled={disabled}
        onChange={(e) => {
          setProgressInputValue(Math.floor(Number(e.currentTarget.value)));
        }}
        onMouseDown={() => (isClicked.current = true)}
        onMouseMove={() => {
          if (isClicked.current) {
            setIsExpandProgressBar(true);
          }
        }}
        onTouchMove={() => setIsExpandProgressBar(true)}
        onMouseUp={() => {
          isClicked.current = false;
          pressAndUp();
        }}
        onTouchEnd={pressAndUp}
      />

      <ProgressVisual
        $isExpand={isExpandProgressBar}
        value={isExpandProgressBar ? progressInputValue : progressPercent}
      />
    </Container>
  );
}

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
