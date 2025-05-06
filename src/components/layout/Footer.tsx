import { faBars, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ButtonIcon } from "../shared/ButtonIcon";
import Controller from "../shared/Controller";
import { ProgressVisual } from "../shared/ProgressVisual";
import { useCurrentPage } from "../../utils";
import { TitleAndSinger } from "../shared/TitleAndSinger";
import { useActivePageStore } from "../../store/layout";
import { useShallow } from "zustand/react/shallow";
import { useCurrentMusicStore } from "../../store/shared";
import { useSelectedMusicIdsStore } from "../../store/storage/useSelectedMusicIdsStore";
import SelectMenu from "../pages/storage/SelectMenu";

export function Footer() {
  const currentPage = useCurrentPage();
  const isPlayerPage = currentPage === "player";

  const selectedMusicIds = useSelectedMusicIdsStore(
    (state) => state.selectedMusicIds
  );

  const isSelected = selectedMusicIds.length > 0;

  return (
    <FooterContainer>
      {!isPlayerPage && (
        <MiniPlayer $isSelected={isSelected}>
          <ProgressVisual />
          <Player />
        </MiniPlayer>
      )}
      {isSelected && <SelectMenu />}
      <NavBar />
    </FooterContainer>
  );
}

function Player() {
  const { title, singer } = useCurrentMusicStore((state) => state.currentMusic);

  const info = (
    <TitleAndSinger title={title} singer={singer} size="small" width="200px" />
  );

  return (
    <PlayerContainer>
      {title ? <Link to="/player">{info}</Link> : info}
      <Controller width={130} />
    </PlayerContainer>
  );
}

function NavBar() {
  const [activePage, setActivePage] = useActivePageStore(
    useShallow((state) => [state.activePage, state.setActivePage])
  );

  const currentPage = useCurrentPage();

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage, setActivePage]);

  return (
    <NavBarContainer>
      <ButtonIcon icon={faHome} href="/" active={activePage.home} />
      <ButtonIcon icon={faSearch} href="/search" active={activePage.search} />
      <ButtonIcon icon={faBars} href="/storage" active={activePage.storage} />
    </NavBarContainer>
  );
}

const FooterContainer = styled.footer`
  position: relative;
  width: 87%;
  left: 6.375%;
  bottom: 4%;
  svg {
    cursor: pointer;
    font-size: 22px;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    bottom: 0;
    width: 100%;
    left: 0;
    border-radius: 0;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 10px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 12px 35px;
  background-color: black;
  border-radius: 0px 0px 36px 36px;
  position: absolute;
  z-index: 99;
  width: 100%;
  bottom: 0;
`;

const MiniPlayer = styled.div<{ $isSelected: boolean }>`
  background-color: black;
  animation: ${({ $isSelected }) => ($isSelected ? "fade-out" : "fade-in")} 0.4s
    forwards;
  position: absolute;
  z-index: 1;
  bottom: 50px;
  width: 100%;

  @keyframes fade-out {
    0% {
    }

    100% {
      display: none;
      transform: translate(0, 56px);
      border-radius: 0px 0px 36px 36px;
    }
  }

  @keyframes fade-in {
    0% {
      border-radius: 0px 0px 36px 36px;
      transform: translate(0, 50px);
    }

    100% {
      transform: translate(0, 0);
    }
  }
`;
