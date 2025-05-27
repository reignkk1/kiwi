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
      {children}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div<{ $isShowTitle: boolean }>`
  display: flex;
  align-items: center;
  padding: 0px 40px 15px 40px;
  position: absolute;
  width: 90%;
  top: 70px;
  left: 22px;
  gap: 20px;
  ${({ $isShowTitle }) =>
    $isShowTitle &&
    css`
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `}
  background-color: #121212;
  z-index: 1;
`;

const Title = styled.div`
  width: 250px;
  color: white;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
