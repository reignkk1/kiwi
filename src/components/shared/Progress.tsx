import styled from "styled-components";
import { palette } from "../../constant";
import { useProgressStore } from "./../../store/shared/useProgressStore";

export function Progress({
  isExpand = false,
  value,
}: {
  isExpand?: boolean;
  value?: number;
}) {
  const progressPercent = useProgressStore((state) => state.progressPercent);
  const percent = value ?? progressPercent;

  return (
    <Container isExpand={isExpand}>
      <Percent progressPercent={percent} />
    </Container>
  );
}

const Container = styled.div<{ isExpand: boolean }>`
  height: ${({ isExpand }) => (isExpand ? "4px" : "2px")};
  background-color: rgba(255, 255, 255, 0.1);
`;

const Percent = styled.div<{ progressPercent: number }>`
  background-color: ${palette.signatureColor};
  width: ${({ progressPercent }) => `${progressPercent}%`};
  height: 100%;
`;
