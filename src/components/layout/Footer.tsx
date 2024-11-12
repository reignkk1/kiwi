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
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveSection } from "../../utils";
import { ButtonIcon } from "../shared/ButtonIcon";

export function Footer() {
  return (
    <Footer.Container>
      <ProgressBar />
      <Player />
      <NavBar />
    </Footer.Container>
  );
}

function Player() {
  const { isPlay, musicInfo, togglePlay } = useAudioStore();

  const togglePlayButton = () => togglePlay();

  return (
    <Player.Container>
      <MusicInfo>
        <Title>{musicInfo.title}</Title>
        <Singer>{musicInfo.singer}</Singer>
      </MusicInfo>
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
  height: 120px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

NavBar.Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  padding: 0px 30px;
`;

const ProgressBar = styled.div`
  height: 1px;
  background-color: var(--signature-color);
`;
const MusicInfo = styled.div`
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
