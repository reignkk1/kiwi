import styled from "styled-components";
import { useAlertStore } from "./hooks";
import { addBasePath } from "../../utils";

export default function Alert() {
  const {
    state: { alertMessageText, show },
  } = useAlertStore();

  return (
    <Container show={show}>
      <span>🥝 {alertMessageText}</span>
    </Container>
  );
}

const Container = styled.div<{ show: boolean }>`
  width: 300px;
  position: absolute;
  left: 50%;
  bottom: 110px;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
  z-index: 99;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: all 0.5s ease-in-out;

  span {
    padding: 12px 15px;
    background-color: rgb(124, 124, 124, 0.9);
    border-radius: 20px;
    color: white;
    font-size: 16px;
  }
`;
