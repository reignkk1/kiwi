import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import Entry from "./Entry";
import Header from "./Header";
import { Footer } from "./Footer";
import Alert from "../shared/Alert";
import { addBasePath } from "../../utils";
import { useLayoutStore } from "../../hooks/store/useLayoutStore";
import Inform from "./Inform";

export default function Layout({ children }: { children: ReactNode }) {
  const {
    state: {
      isShowEntryModal,
      musicBackGroundColor,
      userName,
      isShowInformModal,
    },
    action: { hiddenEntryModal, showEntryModal },
  } = useLayoutStore();

  const backGroundColor = musicBackGroundColor || ["rgba(0,0,0,0.5)"];

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    userName ? hiddenEntryModal() : showEntryModal();

    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, [hiddenEntryModal, showEntryModal, userName]);

  return (
    <Container>
      <BackGroundFilter />
      <Burn $backGroundColor={backGroundColor} />
      <Edge src={`${addBasePath("./img/phone.png")}`}>
        {isShowEntryModal && <Entry />}
        {isShowInformModal && <Inform />}
        <Content>
          <Header />
          {children}
          <Alert />
        </Content>
        <Footer />
      </Edge>
    </Container>
  );
}

const Burn = styled.div<{ $backGroundColor: string[] }>`
  width: 430px;
  height: 250px;
  position: absolute;
  top: 120px;
  z-index: 3;
  background-size: 200% 200%;
  animation: gradientAnimation 100s linear infinite;
  background-position: 190% 190%;
  background: ${({ $backGroundColor }) =>
    `linear-gradient(${$backGroundColor[0]},${$backGroundColor[1]},${$backGroundColor[2]})`};
  filter: blur(150px);

  @keyframes gradientAnimation {
    40% {
      transform: translateX(150px);
    }
    60% {
      transform: translateY(100px);
    }
    75% {
      transform: translateX(-200px);
    }
  }
`;

const Content = styled.div`
  height: 100%;
  padding: 80px 60px;
  & ::-webkit-scrollbar {
    background-color: black;
    height: 3px;
    cursor: pointer;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: grey;
    cursor: pointer;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    padding: 40px 25px;
  }
`;

const BackGroundFilter = styled.div`
  width: 430px;
  height: 785px;
  border-radius: 40px;
  top: 65 px;
  background-color: #121212;
  position: absolute;
  z-index: 1;
  zoom: 0.8;

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: 100%;
    border-radius: 0;
    width: 100%;
    zoom: 1;
  }
`;

const Edge = styled.div<{ src: string }>`
  width: 460px;
  height: 830px;
  background: url(${({ src }) => src}) no-repeat;
  position: relative;
  z-index: 3;
  zoom: 0.8;

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    width: 100%;
    height: 100%;
    background: none;
    zoom: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(-45deg, #fff6b7, #f092bc, #8795e6, #c2ffd8);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

// player img src 바뀔 때 애니메이션 살짝
// 곡정보, 앨범소개 구현
// 음악서랍에서 위치 변경
// 노래 재생 중에 input을 잡고 왼쪽끝까지 끌었을 때 progressBar가 채워짐(?)
