import { faBars, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useAudioStore } from "../../store";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonIcon } from "../shared/ButtonIcon";
import Controller from "../shared/Controller";
import { Progress } from "../shared/Progress";
import { useCurrentPage } from "../../utils";

export function Footer() {
  const currentPage = useCurrentPage();
  const isPlayerPage = currentPage == "player";

  return (
    <Footer.Container>
      {!isPlayerPage && <Progress />}
      {!isPlayerPage && <Player />}
      <NavBar />
    </Footer.Container>
  );
}

function Player() {
  const musicInfo = useAudioStore((state) => state.musicInfo);

  return (
    <Player.Container>
      <Link to="/player">
        <MusicInfo>
          <Title>{musicInfo.title}</Title>
          <Singer>{musicInfo.singer}</Singer>
        </MusicInfo>
      </Link>

      <Controller width={130} />
    </Player.Container>
  );
}

function NavBar() {
  const initialState = {
    home: false,
    search: false,
    storage: false,
  };

  const [active, setActive] = useState(initialState);
  const { pathname } = useLocation();
  const currentPage = useCurrentPage();

  useEffect(() => {
    setActive(() => ({ ...initialState, [currentPage]: true }));
  }, [pathname]);

  return (
    <NavBar.Container>
      <ButtonIcon icon={faHome} href="/" active={active.home} />
      <ButtonIcon icon={faSearch} href="/search" active={active.search} />
      <ButtonIcon icon={faBars} href="/storage" active={active.storage} />
    </NavBar.Container>
  );
}

Footer.Container = styled.footer`
  background-color: black;
  position: absolute;
  width: 87%;
  left: 6.375%;
  bottom: 4%;
  border-radius: 0px 0px 36px 36px;
  svg {
    cursor: pointer;
    font-size: 22px;
  }
`;

Player.Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 10px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

NavBar.Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 12px 35px;
`;

const MusicInfo = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  margin-bottom: 5px;
  font-size: 14px;
`;
const Singer = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
