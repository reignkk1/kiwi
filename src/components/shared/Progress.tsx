import styled from "styled-components";

export function Progress({
  isExpand = false,
  progressPercent,
}: {
  progressPercent: number;
  isExpand?: boolean;
}) {
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
