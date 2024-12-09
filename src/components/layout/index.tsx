import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { parserLocalStorage } from "parser-storages";
import { useAudioStore, useEntryStore } from "../../store";
import Entry from "./Entry";
import Header from "./Header";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const { show, hiddenEntry, showEntry } = useEntryStore();
  const {
    musicInfo: { backGroundColor = "#000" },
  } = useAudioStore();

  useEffect(() => {
    if (parserLocalStorage.get("name")) {
      hiddenEntry();
    } else {
      showEntry();
    }
  }, []);

  return (
    <Container>
      <BackGroundFilter backGroundColor={backGroundColor} />
      <Edge>
        {show && <Entry />}
        <Content>
          <Header />
          {children}
        </Content>
        <Footer />
      </Edge>
    </Container>
  );
}

const Content = styled.div`
  height: 100%;
  margin-top: 80px;
  overflow: auto;
  padding: 0px 60px;
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

const BackGroundFilter = styled.div<{ backGroundColor: string }>`
  width: 430px;
  height: 785px;
  border-radius: 40px;
  background: ${({ backGroundColor }) => `linear-gradient(
    180deg,
    ${backGroundColor},
    ${backGroundColor},
    #111111,
    #121213
  );`};
  background-size: 400% 400%;
  animation: gradient 12s linear infinite;
  position: absolute;
  z-index: 1;
  @media only screen and (max-height: 825px) {
    zoom: 0.8;
  }

  @keyframes gradient {
    0% {
      background-position: 100% 70%;
    }
    50% {
      background-position: 100% 75%;
    }
    100% {
      background-position: 100% 70%;
    }
  }
`;

const Edge = styled.div`
  width: 460px;
  height: 830px;
  background: url("./img/phone.png") no-repeat;
  position: relative;
  z-index: 3;
  & ::-webkit-scrollbar {
    width: 0px;
  }

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
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

// progressbar, controller, 가사 구현하기
// 플레이 리스트 구현
