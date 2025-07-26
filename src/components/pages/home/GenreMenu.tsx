import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import { useActiveGenreMenuStore } from "../../../store/home";
import type { GenreType } from "../../../types";
import { convertToGenreKorea } from "../../../utils";

export default function GenreMenu() {
  const [activeMenu, setActiveMenu] = useActiveGenreMenuStore(
    useShallow((state) => [state.activeMenu, state.setActiveMenu])
  );

  const menu: Array<GenreType | "all"> = ["all", "ballad", "hiphop", "indie"];

  return (
    <Menu>
      {menu.map((id) => (
        <MenuItem
          key={id}
          id={id}
          $active={activeMenu === id}
          onClick={() => setActiveMenu(id)}
        >
          <span>{convertToGenreKorea(id)}</span>
        </MenuItem>
      ))}
    </Menu>
  );
}

const Menu = styled.ul`
  display: flex;
  margin-bottom: 20px;
`;

const MenuItem = styled.li<{ $active: boolean; id: string }>`
  margin-right: 5px;
  cursor: pointer;

  span {
    color: ${({ $active }) => ($active ? "green" : "rgba(255,255,255,0.5)")};
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
