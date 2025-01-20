import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { useAudioStore, useSearchStore } from "../../../store";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { markKeyword } from "../../../utils";
import AlbumImg from "../../shared/AlbumImg";

export default function SearchList() {
  const play = useAudioStore(({ play }) => play);
  const searchKeyWord = useSearchStore((state) => state.searchKeyWord);
  const searchResultMusic = useSearchStore(
    ({ searchResultMusic }) => searchResultMusic
  );

  return (
    <List>
      {searchResultMusic?.map((musicInfo) => (
        <Item>
          <MusicInfo>
            <AlbumImg width={50} height={50} musicInfo={musicInfo} />
            <Info onClick={() => play(musicInfo)}>
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
