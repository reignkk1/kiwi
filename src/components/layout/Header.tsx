import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { userNameStroage } from "../../lib/localStorage";

export default function Header() {
  const { pathname } = useLocation();

  if (pathname === "/player") {
    return null;
  }

  let title = "";

  const { get: getUserNameStorage } = userNameStroage;

  if (pathname === "/") {
    title = getUserNameStorage("name") + "님 어서오세요!";
  } else if (pathname === "/search") {
    title = "나에게 맞춘 탐색";
  } else if (pathname === "/storage") {
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
