import styled from "styled-components";
import { useAudioStore } from "../../../store";
import { convertTime } from "../../../utils";

export default function TimeStamp() {
  const audio = useAudioStore((state) => state.audio);
  const currentTime = useAudioStore((state) => state.currentTime);

  return (
    <Container>
      <span>{convertTime(currentTime)}</span>
      <span>{convertTime(audio.duration)}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 10px;
  font-size: 14px;
`;
