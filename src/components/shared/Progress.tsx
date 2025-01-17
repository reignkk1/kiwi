import styled from "styled-components";
import { useAudioStore } from "./../../store";

export function Progress({
  isExpand = false,
  progressPercent,
}: {
  isExpand?: boolean;
  progressPercent?: number;
}) {
  let progressPercentValue: number;

  if (!progressPercent) {
    progressPercentValue = useAudioStore((state) => state.progressPercent);
  } else {
    progressPercentValue = progressPercent;
  }

  return (
    <Container isExpand={isExpand}>
      <Percent progressPercent={progressPercentValue} />
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
