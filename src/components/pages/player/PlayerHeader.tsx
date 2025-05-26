import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AlbumImg from "../../shared/AlbumImg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { usePlayerHeaderStore } from "../../../hooks/store/usePlayerHeaderStore";

export default function PlayerHeader() {
  const {
    state: { currentMusic, isExpandLyrics },
    action: { openPlayerMenu, closePlayerMenu },
  } = usePlayerHeaderStore();

  const navigate = useNavigate();
  const isAnimation = (currentMusic.title?.length || 0) > 20;

  useEffect(() => {
    closePlayerMenu();
  }, [closePlayerMenu]);

  return (
    <Container>
      {isExpandLyrics && <AlbumImg size="small" music={currentMusic} />}
      <TitleAndSinger
        width={isExpandLyrics ? "174px" : "245px"}
        size="large"
        title={currentMusic.title}
        singer={currentMusic.singer}
        $isAnimation={isAnimation}
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
