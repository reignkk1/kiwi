import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useUserNameStorage from "../../hooks/localStorage/useUserNameStorage";

export default function Header() {
  const { pathname } = useLocation();
  const { userName } = useUserNameStorage();

  if (pathname === "/player") return null;

  const pathNameTitleMap: Record<string, string> = {
    "/": userName + "님 어서오세요!",
    "/search": "나에게 맞춘 탐색",
    "/storage": "음악서랍",
  };

  const title = pathNameTitleMap[pathname];

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
