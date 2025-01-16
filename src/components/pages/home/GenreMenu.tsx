import styled from "styled-components";
import { useActiveGenreMenu } from "../../../store";

export default function GenreMenu() {
  const activeGenreMenu = useActiveGenreMenu((state) => state.activeGenreMenu);
  const setActiveGenreMenu = useActiveGenreMenu(
    (state) => state.setActiveGenreMenu
  );

  const menu = [
    { id: "all", text: "전체" },
    { id: "ballad", text: "발라드" },
    { id: "indie", text: "인디음악" },
    { id: "hiphop", text: "랩/힙합" },
  ];

  return (
    <Container>
      <h2>장르</h2>
      <Menu>
        {menu.map(({ id, text }) => (
          <MenuItem
            id={id}
            active={activeGenreMenu === id}
            onClick={() => setActiveGenreMenu(id)}
          >
            <span>{text}</span>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    li {
      margin-right: 5px;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
`;

const MenuItem = styled.li<{ active: boolean; id: string }>`
  margin-right: 5px;
  cursor: pointer;

  span {
    color: ${({ active }) => (active ? "green" : "rgba(255,255,255,0.5)")};
  }

  &::before {
    display: ${({ id }) => (id === "entire" ? "none" : "inline-block")};
    content: "";
    height: 12px;
    width: 1px;
    margin-right: 5px;
    background-color: grey;
  }
`;
