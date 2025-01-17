import styled from "styled-components";
import { useUserNameStore } from "../../store";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const { userName } = useUserNameStore();

  if (pathname === "/player") {
    return null;
  }

  let title = "";

  if (pathname === "/") {
    title = userName + "님 어서오세요!";
  } else if (pathname === "/search") {
    title = "나에게 맞춘 탐색";
  } else if (pathname === "/list") {
    title = "음악서랍";
  }

  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
