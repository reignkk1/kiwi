import styled from "styled-components";

interface SkeletonProps {
  width: string;
  height: string;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  return <Container width={width} height={height} />;
}

const Container = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};;
  border-radius: 10px;

  background: linear-gradient(
    90deg,
    #2e2e2e 25%,
    #464545 37%,
    #2e2e2e 63%
  );
  background-size: 400% 100%;
  animation: shimmer 14s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 400% 0;
  }
  100% {
    background-position: -400% 0;
  }
`;
