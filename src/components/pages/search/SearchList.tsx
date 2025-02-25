import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useSearchListStore } from "./hooks";
import MusicCard from "../../shared/MusicCard";

export default function SearchList() {
  const {
    state: { searchKeyWord, searchResultMusic },
  } = useSearchListStore();

  return (
    <ul>
      {searchResultMusic?.map((musicInfo) => (
        <Item>
          <MusicCard musicInfo={musicInfo} mark={searchKeyWord} />
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
