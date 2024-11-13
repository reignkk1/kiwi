import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "./layout/Footer";
import Header from "./layout/Header";
import Entry from "./layout/Entry";
import { useEntryStore } from "../store";
import { parserLocalStorage } from "parser-storages";

export default function Layout({ children }: { children: ReactNode }) {
  const { show, hiddenEntry, showEntry } = useEntryStore();

  useEffect(() => {
    if (parserLocalStorage.get("name")) {
      hiddenEntry();
    } else {
      showEntry();
    }
  }, []);

  return (
    <Container>
      <BackGroundFilter />
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
  margin-top: 100px;
  overflow: auto;
  padding: 0px 50px 0px 50px;
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
  background-color: rgba(0, 0, 0, 0.8);
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
