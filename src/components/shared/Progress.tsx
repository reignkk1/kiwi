import styled from "styled-components";
import { useAudioStore } from "./../../store";

export function Progress({
  isExpand = false,
  value,
}: {
  isExpand?: boolean;
  value?: number;
}) {
  const currentProgressPercent = useAudioStore(
    (state) => state.progressPercent
  );

  let progressPercent: number;

  if (!value) {
    progressPercent = currentProgressPercent;
  } else {
    progressPercent = value;
  }

  return (
    <Container isExpand={isExpand}>
      <Percent progressPercent={progressPercent} />
    </Container>
  );
}

const Container = styled.div<{ isExpand: boolean }>`
  height: ${({ isExpand }) => (isExpand ? "4px" : "2px")};
  background-color: rgba(255, 255, 255, 0.1);
`;

const Percent = styled.div<{ progressPercent: number }>`
  background-color: var(--signature-color);
  width: ${({ progressPercent }) => `${progressPercent}%`};
  height: 100%;
`;
