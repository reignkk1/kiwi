import styled from "styled-components";
import { useEffect } from "react";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { usePlayerMenuStore } from "../../../hooks/store/usePlayerMenuStore";
import { Link } from "react-router-dom";
import usePutInMusicDrawer from "../../../hooks/usePutInMusicDrawer";

export default function PlayerMenu() {
  const {
    state: { currentMusic },
    action: { closePlayerMenu },
  } = usePlayerMenuStore();

  const putInMusicDrawer = usePutInMusicDrawer(currentMusic.id);

  useEffect(() => {
    return () => closePlayerMenu();
  }, [closePlayerMenu]);

  return (
    <Container>
      <MusicInfo>
        <AlbumImg size="smallLarge" src={currentMusic.imgSrc} />
        <TitleAndSinger
          title={currentMusic.title}
          singer={currentMusic.singer}
          size="middle"
        />
      </MusicInfo>
      <div>
        <Menu>
          <Link to={`/music/${currentMusic.id}`}>
            <ListButton text="곡 정보" />
          </Link>
          <ListButton text="앨범 소개" />
          <ListButton onClick={putInMusicDrawer} text="음악서랍에 담기" />
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
