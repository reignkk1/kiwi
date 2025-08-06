import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import Entry from "./Entry";
import { Footer } from "./Footer";
import Alert from "../shared/Alert";
import { addBasePath } from "../../utils";
import Inform from "./Inform";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { useCurrentMusicStore } from "../../store/shared";
import { useEntryModalStore, useUserNameStore } from "../../store/layout";
import { useShallow } from "zustand/react/shallow";
import { useInformModalStore } from "../../store/layout/useInfoModalStore";

export default function Layout({ children }: { children: ReactNode }) {
  const musicBackGroundColor = useCurrentMusicStore(
    (state) => state.currentMusic.backGroundColor
  );
  const [isShowEntryModal, hiddenEntryModal, showEntryModal] =
    useEntryModalStore(
      useShallow((state) => [
        state.isShowEntryModal,
        state.hiddenEntryModal,
        state.showEntryModal,
      ])
    );

  const userName = useUserNameStore((state) => state.userName);
  const isShowInformModal = useInformModalStore(
    (state) => state.isShowInformModal
  );

  const currentPage = useCurrentPage();

  const isMusicPage = currentPage === "music";
  const isAlbumPage = currentPage === "album";

  const isBurn = !isMusicPage && !isAlbumPage;

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
      {isBurn && <Burn $backGroundColor={backGroundColor} />}
      <Edge
        role="img"
        aria-label="테두리 이미지"
        src={`${addBasePath("./img/phone.png")}`}
      >
        {isShowEntryModal && <Entry />}
        {isShowInformModal && <Inform />}
        <Content>
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
  animation: gradientAnimation 90s linear infinite;
  background-position: 190% 190%;
  background: ${({ $backGroundColor }) =>
    `linear-gradient(${$backGroundColor[0]},${$backGroundColor[1]},${$backGroundColor[2]})`};
  filter: blur(150px);

  @keyframes gradientAnimation {
    40% {
      transform: translateX(150px);
    }
    60% {
      transform: translateY(60px);
    }
    75% {
      transform: translateX(-200px);
    }
  }
`;

const Content = styled.div`
  height: 100%;
  padding: 70px 60px;

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
  background-color: #121212;
  position: absolute;
  z-index: 1;
  transform: scale(0.9);

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: 100%;
    border-radius: 0;
    width: 100%;
    transform: scale(1);
  }

  @media (max-height: 765px) and (max-width: 479px) {
    transform: scale(1);
  }

  @media (min-height: 725px) and (min-width: 500px) {
    transform: scale(0.9);
  }

  @media (min-width: 480px) and (max-height: 780px) {
    transform: scale(0.8);
  }

  @media (min-width: 480px) and (max-height: 700px) {
    transform: scale(0.7);
  }
`;

const Edge = styled.div<{ src: string }>`
  width: 460px;
  height: 830px;
  background: url(${({ src }) => src}) no-repeat;
  position: relative;
  z-index: 3;
  transform: scale(0.9);

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    width: 100%;
    height: 100%;
    background: none;
    transform: scale(1);
  }

  @media (min-height: 725px) and (min-width: 500px) {
    transform: scale(0.9);
  }

  @media (min-width: 480px) and (max-height: 780px) {
    transform: scale(0.8);
  }

  @media (min-width: 480px) and (max-height: 700px) {
    transform: scale(0.7);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #fff6b7, #f092bc, #8795e6, #c2ffd8);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;

  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: calc(var(--vh, 1vh) * 100);
    background: none;
  }
  /* 
  @media (max-height: 765px) and (max-width: 479px) {
    transform: scale(0.9);
  }
  @media (max-height: 730px) and (max-width: 479px) {
    transform: scale(0.85);
  }
  @media (max-height: 710px) and (max-width: 479px) {
    transform: scale(0.8);
  } */
`;
