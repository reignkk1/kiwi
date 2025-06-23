import styled from "styled-components";
import { ProgressVisual } from "./ProgressVisual";
import { useRef, useState } from "react";
import { convertFromPercentToTime, convertTime } from "../../utils";
import { useProgressBarStore } from "../../hooks/store/useProgressBarStore";
import { palette } from "../../constant";

export function ProgressBar({ disabled = false }: { disabled?: boolean }) {
  const {
    state: {
      duration,
      isExpandProgressBar,
      progressInputValue,
      progressPercent,
      currentTime,
      seeking,
    },
    action: {
      setIsExpandProgressBar,
      setProgressInputValue,
      setProgressPercent,
      setCurrentTime,
      setPressedInputValue,
      setSeekTo,
      setSeeking,
    },
  } = useProgressBarStore();

  const isClicked = useRef(false);
  const inputValue = useRef(0);
  const [seekingValue, setSeekingValue] = useState(0);

  const pressAndUp = () => {
    // 확대 기능 off
    setIsExpandProgressBar(false);

    // 퍼센트 게이지 초기화

    // 눌렀다 뗀 위치로 이동
    // setCurrentTime(convertFromPercentToTime(duration, progressInputValue));

    // 눌렀다 뗀 시점의 위치 value 상태 업뎃
    setPressedInputValue(progressInputValue);
  };

  return (
    <Container>
      <ExpandTime>
        {seeking && (
          <span>
            {convertTime(convertFromPercentToTime(duration, seekingValue))}
          </span>
        )}
      </ExpandTime>
      <Input
        type="range"
        max={duration}
        step={0.1}
        seeking={seeking}
        value={seeking ? seekingValue : currentTime}
        onChange={(e) => {
          inputValue.current = Number(e.currentTarget.value);
          setSeekingValue(Number(e.currentTarget.value));
        }}
        onPointerDown={() => (isClicked.current = true)}
        onPointerMove={() => {
          if (isClicked.current) setSeeking(true);
        }}
        onPointerUp={(e) => {
          setSeekTo(inputValue.current);
          setSeeking(false);
          isClicked.current = false;
        }}
      />
    </Container>
  );
}

// input을 좌로 땡기면 잔상이 남음

const Container = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Input = styled.input<{ max: number; value: number; seeking: boolean }>`
  width: 100%;
  height: ${({ seeking }) => (seeking ? "5px" : "2.5px")};
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;

  background: ${({ max, value }) =>
    `linear-gradient(to right, ${palette.signatureColor} ${
      (value / max) * 100
    }%, #2A2A2A ${(value / max) * 100}%)`};

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0;
    height: 0;
    background: transparent;
    border: none;
  }
`;

const ExpandTime = styled.div`
  height: 15px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
`;
