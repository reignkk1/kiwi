import styled from "styled-components";
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
