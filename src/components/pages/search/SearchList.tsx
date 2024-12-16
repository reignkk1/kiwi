import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { useAudioStore, useSearchStore } from "../../../store";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import { markKeyword } from "../../../utils";

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
            <Img src={musicInfo.imgSrc} />
            <Info>
              <Title>
                <span>{markKeyword(musicInfo.title, searchKeyWord)}</span>
              </Title>
              <Singer>
                <span>{markKeyword(musicInfo.singer, searchKeyWord)}</span>
              </Singer>
            </Info>
          </MusicInfo>
          <ItemButtons>
            <ButtonIcon icon={faPlay} onClick={() => play(musicInfo)} />
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
`;

const ItemButtons = styled.div`
  button {
    margin-left: 10px;
  }
`;

const MusicInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Info = styled.div`
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
