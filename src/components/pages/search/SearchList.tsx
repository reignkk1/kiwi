import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import MusicCard from "../../shared/MusicCard";
import { useSearchStore } from "../../../store/search";
import { useShallow } from "zustand/react/shallow";

export default function SearchList() {
  const [searchKeyWord, searchResultMusic] = useSearchStore(
    useShallow((state) => [state.searchKeyWord, state.searchResultMusic])
  );

  return (
    <ul>
      {searchResultMusic?.map((music) => (
        <Item key={music.id}>
          <MusicCard music={music} mark={searchKeyWord} />
          <ItemButtons>
            <ButtonIcon icon={faEllipsisV} />
          </ItemButtons>
        </Item>
      ))}
    </ul>
  );
}

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  animation: ItemAnimation 0.5s linear;

  @keyframes ItemAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const ItemButtons = styled.div`
  display: flex;
  button {
    margin-left: 10px;
  }
`;
