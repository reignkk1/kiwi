import styled from "styled-components";
import { palette } from "../../constant";
import { useEffect } from "react";
import { convertFromTimeToPercent } from "../../utils";
import useProgressVisualStore from "../../hooks/store/useProgressVisualStore";

export function ProgressVisual({
  $isExpand = false,
  value,
}: {
  $isExpand?: boolean;
  value?: number;
}) {
  const {
    state: { currentTime, duration, progressPercent },
    action: { setProgressPercent },
  } = useProgressVisualStore();

  useEffect(() => {
    setProgressPercent(convertFromTimeToPercent(duration, currentTime) || 0);
  }, [currentTime, duration, setProgressPercent]);

  const percent = value ?? progressPercent;

  return (
    <Container $isExpand={$isExpand}>
      <Percent $progressPercent={percent} />
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
