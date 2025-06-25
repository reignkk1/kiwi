import styled from "styled-components";
import { formatTime } from "../../../utils";
import { useTimeStampStore } from "../../../hooks/store/useTimeStampStore";

export default function TimeStamp() {
  const {
    state: { duration, currentTime, seeking, seekingValue },
  } = useTimeStampStore();

  return (
    <Container>
      <span>
        {seeking ? formatTime(seekingValue) : formatTime(currentTime)}
      </span>
      <span>{formatTime(duration)}</span>
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
