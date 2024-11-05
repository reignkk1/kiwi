import { ReactNode } from "react";
import styled from "styled-components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Layout.Container>
      <BackGroundFilter />
      <Edge>{children}</Edge>
    </Layout.Container>
  );
}

function Edge({ children }: { children: ReactNode }) {
  return (
    <Edge.Container>
      <Content>{children}</Content>
    </Edge.Container>
  );
}

const Content = styled.div`
  height: 100%;
  padding: 60px 40px 40px 40px;
`;

const BackGroundFilter = styled.div`
  width: 430px;
  height: 785px;
  border-radius: 40px;
  background-color: red;
  position: absolute;
  z-index: 1;
  @media only screen and (max-height: 825px) {
    zoom: 0.8;
  }
`;

Layout.Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #fff6b7, #f092bc, #8795e6, #c2ffd8);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

Edge.Container = styled.div`
  width: 460px;
  height: 830px;
  background: url("./img/phone.png") no-repeat;
  position: relative;
  z-index: 2;

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
