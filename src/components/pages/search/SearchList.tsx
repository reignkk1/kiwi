import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { markKeyword } from "../../../utils";
import AlbumImg from "../../shared/AlbumImg";
import { useSearchListStore } from "./hooks";

export default function SearchList() {
  const {
    state: { searchKeyWord, searchResultMusic },
    action: { musicPlay },
  } = useSearchListStore();

  return (
    <List>
      {searchResultMusic?.map((musicInfo) => (
        <Item>
          <MusicInfo>
            <AlbumImg type="small" musicInfo={musicInfo} />
            <Info onClick={() => musicPlay(musicInfo)}>
              <Title>
                <span>{markKeyword(musicInfo.title, searchKeyWord)}</span>
              </Title>
              <Singer>
                <span>{markKeyword(musicInfo.singer, searchKeyWord)}</span>
              </Singer>
            </Info>
          </MusicInfo>
          <ItemButtons>
            <ButtonIcon icon={faEllipsisV} />
          </ItemButtons>
        </Item>
      ))}
    </List>
  );
}

const List = styled.ul``;

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

const MusicInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  margin-left: 10px;
  cursor: pointer;
  mark {
    background: none;
    color: var(--signature-color);
  }
`;

const Title = styled.div`
  width: 240px;
  color: white;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Singer = styled.div`
  font-size: 14px;
  color: var(--singer-color);
`;
