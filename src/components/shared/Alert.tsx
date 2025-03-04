import styled from "styled-components";
import { useAlertStore } from "./hooks";

export default function Alert() {
  const {
    state: { alertMessageText, show },
  } = useAlertStore();

  return show ? (
    <Container show={show}>
      <span>{alertMessageText}</span>
    </Container>
  ) : null;
}

const Container = styled.div<{ show: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 110px;
  transform: translateX(-50%);
  text-align: center;
  /* animation: 2s flicker forwards; */
  pointer-events: none;
  z-index: 99;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: all 2s;
  span {
    background-color: rgb(124, 124, 124, 0.9);
    padding: 10px 25px;
    border-radius: 20px;
    color: white;
    font-size: 16px;
  }

  @keyframes flicker {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
