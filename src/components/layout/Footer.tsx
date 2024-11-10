import {
  faBackwardStep,
  faBars,
  faForwardStep,
  faHome,
  faPause,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useAudioStore } from "../../store";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveSection } from "../../utils";

export function Footer() {
  const { isPlay, musicInfo, togglePlay } = useAudioStore();
  const { pathname } = useLocation();
  const activeSection = useActiveSection();

  const initialState = {
    home: false,
    search: false,
    list: false,
  };

  const [active, setActive] = useState(initialState);

  useEffect(() => {
    setActive(() => ({ ...initialState, [activeSection]: true }));
  }, [pathname]);

  const togglePlayButton = () => {
    togglePlay();
  };

  return (
    <Container>
      <ProgressBar />
      <MiniPlayer>
        <MusicInfo>
          <Title>{musicInfo.title}</Title>
          <Singer>{musicInfo.singer}</Singer>
        </MusicInfo>
        <MusicContorller>
          <FontAwesomeIcon icon={faBackwardStep} />
          <FontAwesomeIcon
            onClick={togglePlayButton}
            icon={isPlay ? faPause : faPlay}
          />
          <FontAwesomeIcon icon={faForwardStep} />
        </MusicContorller>
      </MiniPlayer>
      <NavBar>
        <NavIcon active={active.home}>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </NavIcon>
        <NavIcon active={active.search}>
          <Link to={"/search"}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </NavIcon>
        <NavIcon active={active.list}>
          <Link to={"/list"}>
            <FontAwesomeIcon icon={faBars} />
          </Link>
        </NavIcon>
      </NavBar>
    </Container>
  );
}

// footer config 데이터 만들기
// navbar 따로 컴포넌트 분리
// 그냥 getPageConfig 모듈 만들지 말고
// pageConfig['home'] 이런식으로 하기

const Container = styled.footer`
  width: 87%;
  height: 120px;
  background-color: black;
  position: absolute;
  left: 6.375%;
  bottom: 4%;
  border-radius: 0px 0px 36px 36px;
  svg {
    cursor: pointer;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const MiniPlayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const NavBar = styled.nav`
  height: 49%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
`;

const NavIcon = styled.div<{ active: boolean }>`
  svg {
    color: ${({ active }) => (active ? "var(--signature-color)" : null)};
  }
`;

const ProgressBar = styled.div`
  height: 1px;
  background-color: var(--signature-color);
`;
const MusicInfo = styled.div`
  margin-left: 20px;
`;
const Title = styled.div`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  margin-bottom: 5px;
  font-size: 14px;
`;
const Singer = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;
const MusicContorller = styled.div`
  width: 140px;
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
  svg {
    margin-left: 30px;
  }
`;
