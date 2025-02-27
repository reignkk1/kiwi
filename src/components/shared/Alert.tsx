import styled from "styled-components";
import { useAlertStore } from "./hooks";

export default function Alert() {
  const {
    state: { alertMessageText },
  } = useAlertStore();
  return (
    <Container>
      <span>{alertMessageText}현재 곡을 반복합니다.</span>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 110px;
  transform: translateX(-50%);
  text-align: center;
  animation: 3s flicker infinite;

  span {
    background-color: rgb(124, 124, 124, 0.9);
    padding: 10px 25px;
    border-radius: 20px;
    color: white;
    font-size: 16px;
  }

  @keyframes flicker {
    0% {
      opacity: 1;
    }

    30% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

// 알림 애니메이션 만들고 뒤에 있는 버튼 클릭할 수 있게끔 구현
