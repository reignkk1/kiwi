import styled from "styled-components";
import { useUserNameStore } from "../../store";
import pageConfig from "../../pageConfig.json";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const { userName } = useUserNameStore();

  const config = Object.values(pageConfig).filter(
    (key) => key.path === pathname
  )[0];

  if (!config) {
    return null;
  }

  let title = "";

  if (pathname === "/") {
    title = userName + config.headerTitle;
  } else {
    title = config.headerTitle;
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
