import styled from "styled-components";
import { useEffect } from "react";
import { useProgressStore } from "./hooks";

export function Progress({
  isExpand = false,
  value,
}: {
  isExpand?: boolean;
  value?: number;
}) {
  const {
    state: { audio, progressPercent },
    action: { updateProgressPercent },
  } = useProgressStore();

  let percent: number;

  if (!value) {
    percent = progressPercent;
  } else {
    percent = value;
  }

  useEffect(() => {
    audio.ontimeupdate = updateProgressPercent;
  }, []);

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
  background-color: var(--signature-color);
  width: ${({ progressPercent }) => `${progressPercent}%`};
  height: 100%;
`;
