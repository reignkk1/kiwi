import styled from "styled-components";
import { usePlayerMenuStore } from "./hooks";
import { useEffect, useState } from "react";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { parserLocalStorage } from "parser-storages";

export default function PlayerMenu() {
  const {
    state: { musicInfo },
    action: { closePlayerMenu },
  } = usePlayerMenuStore();

  useEffect(() => {
    return () => {
      closePlayerMenu();
    };
  }, []);

  const onClick = () => {
    const isIncluded = parserLocalStorage
      .get("musicDrawer")
      .some((id: number) => id === musicInfo.id);

    if (isIncluded) {
    }

    if (parserLocalStorage.get("musicDrawer")) {
      parserLocalStorage.set("musicDrawer", [
        ...parserLocalStorage.get("musicDrawer"),
        musicInfo.id,
      ]);
    } else {
      parserLocalStorage.set("musicDrawer", [musicInfo.id]);
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
          <MenuList>곡 정보</MenuList>
          <MenuList>앨범 정보</MenuList>
          <MenuList onClick={onClick}>음악서랍에 담기</MenuList>
        </Menu>
        <CloseButton onClick={() => closePlayerMenu()}>
          <button>닫기</button>
        </CloseButton>
      </div>
    </Container>
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
  margin-bottom: 40px;
  cursor: pointer;
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
