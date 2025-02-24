import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AlbumImg from "../../shared/AlbumImg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePlayerHeaderStore } from "./hooks";
import { TitleAndSinger } from "../../shared/TitleAndSinger";

export default function PlayerHeader() {
  const {
    state: { musicInfo, isExpandLyrics },
    action: { openPlayerMenu, closePlayerMenu },
  } = usePlayerHeaderStore();

  const navigate = useNavigate();
  const isAnimation = musicInfo.title?.length > 20;

  useEffect(() => {
    closePlayerMenu();
  }, []);

  return (
    <Container>
      {isExpandLyrics && <AlbumImg type="small" musicInfo={musicInfo} />}
      <TitleAndSinger
        width={isExpandLyrics ? "174px" : "245px"}
        size="large"
        title={musicInfo.title}
        singer={musicInfo.singer}
        isAnimation={isAnimation}
      />
      <Buttons>
        <ButtonIcon
          onClick={() => openPlayerMenu()}
          icon={faEllipsisV}
          size={20}
        />
        <ButtonIcon
          icon={faChevronDown}
          size={20}
          onClick={() => navigate(-1)}
        />
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  button:first-child {
    margin-right: 20px;
  }
`;
