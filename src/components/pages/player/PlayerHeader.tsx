import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AlbumImg from "../../shared/AlbumImg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { useCurrentMusicStore } from "../../../store/shared";
import {
  useIsExpandLyricsStore,
  useIsPlayerMenuStore,
} from "../../../store/player";
import { useShallow } from "zustand/react/shallow";

export default function PlayerHeader() {
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const isExpandLyrics = useIsExpandLyricsStore(
    (state) => state.isExpandLyrics
  );

  const [openPlayerMenu, closePlayerMenu] = useIsPlayerMenuStore(
    useShallow((state) => [state.openPlayerMenu, state.closePlayerMenu])
  );

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
          ariaLabel="메뉴"
          onClick={() => openPlayerMenu()}
          icon={faEllipsisV}
          size={20}
        />
        <ButtonIcon
          ariaLabel="뒤로가기"
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
