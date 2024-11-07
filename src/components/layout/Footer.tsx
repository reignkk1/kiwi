import {
  faBackwardStep,
  faBars,
  faForwardStep,
  faHome,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export function Footer() {
  return (
    <Container>
      <ProgressBar />
      <MiniPlayer>
        <MusicInfo>
          <Title>나의 사춘기에게</Title>
          <Singer>볼빨간사춘기</Singer>
        </MusicInfo>
        <MusicContorller>
          <FontAwesomeIcon icon={faBackwardStep} />
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faForwardStep} />
        </MusicContorller>
      </MiniPlayer>
      <NavBar>
        <FontAwesomeIcon icon={faHome} />
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faBars} />
      </NavBar>
    </Container>
  );
}

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

const ProgressBar = styled.div`
  height: 1px;
  background-color: #0ceb0c;
`;
const MusicInfo = styled.div`
  margin-left: 20px;
`;
const Title = styled.div`
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
