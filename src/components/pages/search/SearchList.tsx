import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { useAudioStore, useSearchStore } from "../../../store";
import { faEllipsisV, faPlay } from "@fortawesome/free-solid-svg-icons";
import { markKeyword } from "../../../utils";

export default function SearchList() {
  const { play } = useAudioStore();
  const { searchResultMusic, searchKeyWord } = useSearchStore();

  return (
    <List>
      {searchResultMusic?.map(({ title, singer, imgSrc }) => (
        <Item>
          <MusicInfo>
            <Img src={imgSrc} />
            <Info>
              <Title>
                <span>{markKeyword(title, searchKeyWord)}</span>
              </Title>
              <Singer>
                <span>{markKeyword(singer, searchKeyWord)}</span>
              </Singer>
            </Info>
          </MusicInfo>
          <ItemButtons>
            <ButtonIcon
              icon={faPlay}
              onClick={() => play({ title, singer })}
              size="18px"
            />
            <ButtonIcon icon={faEllipsisV} size="18px" />
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
