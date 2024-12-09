import {
  faBackwardStep,
  faBars,
  faForwardStep,
  faHome,
  faPause,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useAudioStore } from "../../store";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveSection } from "../../utils";
import { ButtonIcon } from "../shared/ButtonIcon";
import { ProgressBar } from "../shared/ProgressBar";

export function Footer() {
  const section = useActiveSection();
  const isPlayerPage = section == "player";
  return (
    <Footer.Container>
      {!isPlayerPage && <ProgressBar />}
      {!isPlayerPage && <Player />}
      <NavBar />
    </Footer.Container>
  );
}

function Player() {
  const { isPlay, musicInfo, togglePlay } = useAudioStore();

  const togglePlayButton = () => togglePlay();

  return (
    <Player.Container>
      <Link to="/player">
        <MusicInfo>
          <Title>{musicInfo.title}</Title>
          <Singer>{musicInfo.singer}</Singer>
        </MusicInfo>
      </Link>
      <MusicContorller>
        <ButtonIcon icon={faBackwardStep} />
        <ButtonIcon
          icon={isPlay ? faPause : faPlay}
          onClick={togglePlayButton}
        />
        <ButtonIcon icon={faForwardStep} />
      </MusicContorller>
    </Player.Container>
  );
}

function NavBar() {
  const initialState = {
    home: false,
    search: false,
    list: false,
  };

  const [active, setActive] = useState(initialState);
  const { pathname } = useLocation();
  const activeSection = useActiveSection();

  useEffect(() => {
    setActive(() => ({ ...initialState, [activeSection]: true }));
  }, [pathname]);

  return (
    <NavBar.Container>
      <ButtonIcon icon={faHome} href="/" active={active.home} />
      <ButtonIcon icon={faSearch} href="/search" active={active.search} />
      <ButtonIcon icon={faBars} href="/list" active={active.list} />
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
  padding: 10px 0px;
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
  margin-left: 20px;
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
const MusicContorller = styled.div`
  display: flex;
  justify-content: space-between;
  width: 130px;
  margin-right: 20px;
`;
