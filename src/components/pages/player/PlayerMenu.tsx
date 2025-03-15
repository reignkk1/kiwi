import styled from "styled-components";
import { usePlayerMenuStore } from "./hooks";
import { useEffect } from "react";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { parserLocalStorage } from "parser-storages";

export default function PlayerMenu() {
  const {
    state: { musicInfo },
    action: { closePlayerMenu, toggleFadeAlertMessage },
  } = usePlayerMenuStore();

  useEffect(() => {
    return () => closePlayerMenu();
  }, []);

  const onClick = () => {
    const isIncluded = parserLocalStorage
      .get("musicDrawer")
      ?.some((id: number) => id === musicInfo.id);

    if (isIncluded) {
      return toggleFadeAlertMessage("이미 담긴 곡 입니다.");
    } else {
      toggleFadeAlertMessage("1곡을 음악서랍에 담았습니다.");

      if (parserLocalStorage.get("musicDrawer")) {
        parserLocalStorage.set("musicDrawer", [
          ...parserLocalStorage.get("musicDrawer"),
          musicInfo.id,
        ]);
      } else {
        parserLocalStorage.set("musicDrawer", [musicInfo.id]);
      }
    }
  };

  return (
    <Container>
      <MusicInfo>
        <AlbumImg type="smallLarge" musicInfo={musicInfo} />
        <TitleAndSinger
          title={musicInfo.title}
          singer={musicInfo.singer}
          size="middle"
        />
      </MusicInfo>
      <div>
        <Menu>
          <ListButton text="곡 정보" />
          <ListButton text="앨범 정보" />
          <ListButton onClick={onClick} text="음악서랍에 담기" />
        </Menu>
        <CloseButton onClick={() => closePlayerMenu()}>
          <button>닫기</button>
        </CloseButton>
      </div>
    </Container>
  );
}

interface ListButtonProps {
  text: string;
  onClick?: () => void;
}

function ListButton({ text, onClick }: ListButtonProps) {
  return (
    <MenuList>
      <button onClick={onClick}>{text}</button>
    </MenuList>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 64px;
  color: white;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
`;

const Menu = styled.ul``;
const MenuList = styled.li`
  margin-bottom: 30px;
  cursor: pointer;
  button {
    text-align: start;
    width: 100%;
    color: white;
    font-size: 16px;
    padding: 5px 0px;
  }
`;

const CloseButton = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    color: white;
    border-top: 0.5px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    padding: 30px 0px;
    font-size: 16px;
  }
`;
