import styled from "styled-components";
import {
  useAudioStore,
  useIsExpandStore,
  useProgressInputStore,
} from "../../../store";
import { convertFromPercentToTime, convertTime } from "../../../utils";
import { ProgressBar } from "../../shared/ProgressBar";
import { useShallow } from "zustand/react/shallow";

export default function TimeStamp() {
  const [audio, currentTime] = useAudioStore(
    useShallow((state) => [state.audio, state.currentTime])
  );

  const isExpand = useIsExpandStore((state) => state.isExpand);
  const progressInputValue = useProgressInputStore(
    (state) => state.progressInputValue
  );

  return (
    <>
      <ProgressBar />
      <Container>
        <span>
          {isExpand
            ? convertTime(
                convertFromPercentToTime(audio.duration, progressInputValue)
              )
            : convertTime(currentTime)}
        </span>
        <span>{convertTime(audio.duration)}</span>
      </Container>
    </>
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
