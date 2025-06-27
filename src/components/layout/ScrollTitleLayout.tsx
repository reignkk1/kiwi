import styled, { css } from "styled-components";
import { useScrollStore } from "../../store/shared";
import { ReactNode } from "react";
import { ButtonIcon } from "../shared/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function ScrollTitleLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const navigate = useNavigate();

  const setScrollTop = useScrollStore((state) => state.setScrollTop);
  const scrollTop = useScrollStore((state) => state.scrollTop);

  const isShowTitle = scrollTop > 0;
  return (
    <Container onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <Header $isShowTitle={isShowTitle}>
        <ButtonIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
        <Title>{isShowTitle && title}</Title>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: auto;
  padding-top: 64px;
  padding-bottom: 150px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div<{ $isShowTitle: boolean }>`
  display: flex;
  position: absolute;
  width: 90%;
  top: 65px;
  left: 22px;
  padding-bottom: 15px;
  button {
    margin-left: 30px;
  }

  ${({ $isShowTitle }) =>
    $isShowTitle &&
    css`
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `}
  background-color: #121212;
  z-index: 1;
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    top: 20px;
    width: 100%;
    left: 0px;
  }
`;

const Title = styled.span`
  width: 200px;
  position: absolute;
  left: 21%;

  color: white;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  line-height: 1.2;
  margin-left: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
