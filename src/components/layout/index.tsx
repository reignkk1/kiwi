import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { parserLocalStorage } from "parser-storages";
import Entry from "./Entry";
import Header from "./Header";
import { Footer } from "./Footer";
import { useLayoutStore } from "./hooks";

export default function Layout({ children }: { children: ReactNode }) {
  const {
    state: { isModal, musicBackGroundColor },
    action: { hiddenModal, showModal },
  } = useLayoutStore();

  const backGroundColor = musicBackGroundColor || "rgba(0,0,0,0.5)";

  useEffect(() => {
    if (parserLocalStorage.get("name")) {
      hiddenModal();
    } else {
      showModal();
    }
  }, []);

  return (
    <Container>
      <BackGroundFilter />
      <Burn backGroundColor={backGroundColor} />
      <Edge>
        {isModal && <Entry />}
        <Content>
          <Header />
          {children}
        </Content>
        <Footer />
      </Edge>
    </Container>
  );
}

const Burn = styled.div<{ backGroundColor: string[] }>`
  width: 430px;
  height: 250px;
  position: absolute;
  top: 120px;
  z-index: 3;
  background-size: 200% 200%;
  animation: gradientAnimation 100s linear infinite;
  background-position: 190% 190%;
  background: ${({ backGroundColor }) =>
    `linear-gradient(${backGroundColor[0]},${backGroundColor[1]},${backGroundColor[2]})`};
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
`;

const BackGroundFilter = styled.div`
  width: 430px;
  height: 785px;
  border-radius: 40px;
  top: 65 px;
  background-color: #121212;
  position: absolute;
  z-index: 1;
  @media only screen and (max-height: 825px) {
    zoom: 0.8;
  }
`;

const Edge = styled.div`
  width: 460px;
  height: 830px;
  background: url("./img/phone.png") no-repeat;
  position: relative;
  z-index: 3;

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    width: 100%;
    height: 100%;
    zoom: 1 !important;
  }
  @media only screen and (max-height: 825px) {
    zoom: 0.8;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    display: none;
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
