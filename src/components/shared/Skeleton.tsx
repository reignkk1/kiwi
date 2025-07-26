import styled from "styled-components";

export default function Skeleton() {
  return <Container />;
}

const Container = styled.div`
  width: 340px;
  height: 200px;
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
