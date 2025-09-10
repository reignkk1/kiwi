import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCurrentPage } from "../../hooks/useCurrentPage";

export default function PlaylistHeaderNav() {
  const currentPage = useCurrentPage();

  return (
    <Container>
      <Ul>
        <Li $active={currentPage === "playlist"}>
          <Link to="/playlist">재생목록</Link>
        </Li>
        <Li $active={currentPage === "drawer"}>
          <Link to="/drawer">음악서랍</Link>
        </Li>
      </Ul>
    </Container>
  );
}

const Container = styled.nav`
  margin-bottom: 30px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 15px;
`;

const Li = styled.li<{ $active: boolean }>`
  a {
    color: ${({ $active }) =>
      $active ? "white" : "rgba(255, 255, 255, 0.3);"};
    font-size: 20px;
  }
`;
