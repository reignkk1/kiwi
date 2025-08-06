import styled from "styled-components";
import { palette } from "../../constant";
import { useAudioStore } from "../../store/audio";
import { useShallow } from "zustand/react/shallow";

export function ProgressVisual({
  $isExpand = false,
}: {
  $isExpand?: boolean;
  value?: number;
}) {
  const [currentTime, duration] = useAudioStore(
    useShallow((state) => [state.currentTime, state.duration])
  );

  return (
    <Container $isExpand={$isExpand}>
      <Percent $progressPercent={(currentTime / duration) * 100 || 0} />
    </Container>
  );
}

const Container = styled.div<{ $isExpand: boolean }>`
  height: ${({ $isExpand }) => ($isExpand ? "4px" : "2px")};
  background-color: rgba(255, 255, 255, 0.1);
`;

const Percent = styled.div<{ $progressPercent: number }>`
  background-color: ${palette.signatureColor};
  width: ${({ $progressPercent }) => `${$progressPercent}%`};
  height: 100%;
`;
