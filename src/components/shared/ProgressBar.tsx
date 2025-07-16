import styled from "styled-components";
import { useRef } from "react";
import { formatTime } from "../../utils";
import { useProgressBarStore } from "../../hooks/store/useProgressBarStore";
import { palette } from "../../constant";

export function ProgressBar() {
  const {
    state: { duration, currentTime, seeking, seekingValue },
    action: { setSeekTo, setSeeking, setSeekingValue },
  } = useProgressBarStore();

  const isClicked = useRef(false);
  const inputValue = useRef(0);

  return (
    <Container>
      <ExpandTime>
        {seeking && <span>{formatTime(seekingValue)}</span>}
      </ExpandTime>
      <Input
        type="range"
        max={duration}
        step={0.1}
        $seeking={seeking}
        value={seeking ? seekingValue : currentTime}
        onChange={(e) => {
          inputValue.current = Number(e.currentTarget.value);
          setSeekingValue(Number(e.currentTarget.value));
        }}
        onPointerDown={() => (isClicked.current = true)}
        onPointerMove={() => isClicked.current && !seeking && setSeeking(true)}
        onPointerUp={() => {
          isClicked.current = false;
          setSeekTo(inputValue.current);
        }}
        onTouchEnd={() => {
          isClicked.current = false;
          setSeekTo(inputValue.current);
        }}
      />
    </Container>
  );
}

// seeking이 true일때 seekingValue를 보여주다가 마우스를 놓으면 seeking이 false로 변하면서
// onPointerUp 이벤트가 발생하기 전에 value값이 currentTime으로 바껴서 이전 값을 보여줬다가
// onPointerUp 이벤트가 실행이되면서 currentTime을 새로 업뎃하여 input value가 다시 바뀜
// 그래서 깜빡이는 잔상 같은 것들이 나타남.

const Container = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Input = styled.input.attrs<{
  max: number;
  value: number;
  $seeking: boolean;
}>(({ max, value }) => ({
  style: {
    background: `linear-gradient(to right, ${palette.signatureColor} ${
      (value / max) * 100
    }%, #2A2A2A ${(value / max) * 100}%)`,
  },
}))`
  width: 100%;
  height: ${({ $seeking }) => ($seeking ? "5px" : "2.5px")};
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  touch-action: none;

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
