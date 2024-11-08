import styled from "styled-components";
import { getPageConfig } from "../../utils";
import { useLocation } from "react-router-dom";
import { parserLocalStorage } from "parser-storages";
import { useUserNameStore } from "../../store";

export default function Header() {
  const { pathname } = useLocation();
  const config = getPageConfig(pathname);
  const { userName } = useUserNameStore();
  return (
    <Container>
      <Title>{userName + config?.headerTitle}</Title>
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
