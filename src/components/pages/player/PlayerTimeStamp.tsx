import styled from "styled-components";
import { formatTime } from "../../../utils";
import { useAudioStore } from "../../../store/audio";
import { useSeekStore } from "../../../store/audio/useSeekStore";
import { useShallow } from "zustand/react/shallow";

export default function PlayerTimeStamp() {
  const [duration, currentTime] = useAudioStore(
    useShallow((state) => [state.duration, state.currentTime])
  );

  const [seeking, seekingValue] = useSeekStore(
    useShallow((state) => [state.seeking, state.seekingValue])
  );

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
