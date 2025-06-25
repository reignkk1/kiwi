import styled from "styled-components";
import { palette } from "../../constant";
import useProgressVisualStore from "../../hooks/store/useProgressVisualStore";

export function ProgressVisual({
  $isExpand = false,
}: {
  $isExpand?: boolean;
  value?: number;
}) {
  const {
    state: { currentTime, duration },
  } = useProgressVisualStore();

  return (
    <Container $isExpand={$isExpand}>
      <Percent $progressPercent={(currentTime / duration) * 100} />
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
