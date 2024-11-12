import styled from "styled-components";
import musicData from "../../../musicData.json";
import { useEffect, useState } from "react";
import { MusicType } from "../../../types";
import pageConfig from "../../../pageConfig.json";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAudioStore } from "../../../store";
import { ButtonIcon } from "../../shared/ButtonIcon";

export default function AlbumList() {
  const musicInfo = musicData.data;
  const [music, setMusic] = useState<MusicType[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>("entire");
  const { contentMenu, contentTitle } = pageConfig.home;

  useEffect(() => {
    let music: MusicType[];

    if (activeMenu === "entire") {
      music = musicInfo;
    } else {
      music = musicInfo.filter(({ genre }) => genre === activeMenu);
    }

    setMusic(music);
  }, [activeMenu]);

  const onClickMenuItem = (id: string) => () => setActiveMenu(id);

  return (
    <Container>
      <Header>
        <h2>{contentTitle}</h2>
        <Menu>
          {contentMenu.map(({ id, text }) => (
            <MenuItem
              id={id}
              active={activeMenu === id}
              onClick={onClickMenuItem(id)}
            >
              <span>{text}</span>
            </MenuItem>
          ))}
        </Menu>
      </Header>
      <MusicList>
        {music.map(({ title, singer, imgSrc }) => (
          <Album title={title} singer={singer} imgSrc={imgSrc} />
        ))}
      </MusicList>
    </Container>
  );
}

function Album({
  title,
  singer,
  imgSrc,
}: {
  title: string;
  singer: string;
  imgSrc: string;
}) {
  const { play } = useAudioStore();

  const onClickPlayButton = () => play({ title, singer });

  return (
    <AlbumTemplate>
      <AlbumImg>
        <img src={imgSrc} />
        <ButtonIcon
          icon={faPlay}
          size="18px"
          color="white"
          onClick={onClickPlayButton}
        />
      </AlbumImg>
      <AlbumInfo>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
      </AlbumInfo>
    </AlbumTemplate>
  );
}

const Container = styled.div`
  height: 150vh;
`;

const Header = styled.div`
  margin-bottom: 10px;
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    li {
      margin-right: 5px;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
`;

const MenuItem = styled.li<{ active: boolean; id: string }>`
  margin-right: 5px;
  cursor: pointer;

  span {
    color: ${({ active }) => (active ? "green" : "rgba(255,255,255,0.5)")};
  }

  &::before {
    display: ${({ id }) => (id === "entire" ? "none" : "inline-block")};
    content: "";
    height: 12px;
    width: 1px;
    margin-right: 5px;
    background-color: grey;
  }
`;

const MusicList = styled.div`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow: auto;
  grid-gap: 10px;
`;

const AlbumTemplate = styled.div`
  width: 130px;
`;

const AlbumImg = styled.div`
  position: relative;
  img {
    border-radius: 5px;
    width: 100%;
    object-fit: fill;
  }
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

const AlbumInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;
const Title = styled.div`
  color: white;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;
const Singer = styled.div`
  color: var(--singer-color);
`;
