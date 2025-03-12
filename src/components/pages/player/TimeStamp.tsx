import styled from "styled-components";
import { convertFromPercentToTime, convertTime } from "../../../utils";
import { useTimeStampStore } from "./hooks";

export default function TimeStamp() {
  const {
    state: { duration, currentTime, isExpandProgressBar, progressInputValue },
  } = useTimeStampStore();

  return (
    <Container>
      <span>
        {isExpandProgressBar
          ? convertTime(convertFromPercentToTime(duration, progressInputValue))
          : convertTime(currentTime)}
      </span>
      <span>{convertTime(duration)}</span>
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
