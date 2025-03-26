import styled from "styled-components";
import { Progress } from "./Progress";
import { useRef } from "react";
import { convertFromPercentToTime, convertTime } from "../../utils";
import { useProgressBarStore } from "./hooks";

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
      setMoveTimePoint,
    },
  } = useProgressBarStore();

  const isClicked = useRef<boolean>(false);

  return (
    <Container>
      {!disabled && (
        <ExpandTime>
          {isExpandProgressBar && (
            <span>
              {convertTime(
                convertFromPercentToTime(duration, progressInputValue)
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
          setMoveTimePoint(
            convertFromPercentToTime(duration, progressInputValue)
          );
        }}
        onTouchStart={() => {
          setMoveTimePoint(
            convertFromPercentToTime(duration, progressInputValue)
          );
        }}
        onMouseDown={() => {
          isClicked.current = true;
        }}
        onMouseMove={() => {
          if (isClicked.current) {
            setIsExpandProgressBar(true);
          }
        }}
        onTouchMove={() => {
          if (isClicked.current) {
            setIsExpandProgressBar(true);
          }
        }}
        onMouseUp={() => {
          isClicked.current = false;
          setIsExpandProgressBar(false);
          setProgressPercent(0);
        }}
        onTouchEnd={() => {
          isClicked.current = false;
          setIsExpandProgressBar(false);
          setProgressPercent(0);
        }}
      />

      <Progress
        isExpand={isExpandProgressBar}
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
