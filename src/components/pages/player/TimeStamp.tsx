import styled from "styled-components";
import { convertFromPercentToTime, convertTime } from "../../../utils";
import { useTimeStampStore } from "./hooks";

export default function TimeStamp() {
  const {
    state: { audio, currentTime, isExpandProgressBar, progressInputValue },
  } = useTimeStampStore();

  return (
    <Container>
      <span>
        {isExpandProgressBar
          ? convertTime(
              convertFromPercentToTime(audio.duration, progressInputValue)
            )
          : convertTime(currentTime)}
      </span>
      <span>{convertTime(audio.duration)}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin: 12px 0px;
  font-size: 14px;

  span:nth-child(2) {
    color: rgba(255, 255, 255, 0.5);
  }
`;
