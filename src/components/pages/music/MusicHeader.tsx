import styled, { css } from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMusicScrollStore } from "../../../store/music/useMusicScrollStore";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";

export default function MusicHeader() {
  const navigate = useNavigate();
  const music = useMusicDataFromId((state) => state.music);

  const scrollTop = useMusicScrollStore((state) => state.scrollTop);
  const isShowTitle = scrollTop > 0;

  return (
    <Container $isShowTitle={isShowTitle}>
      <ButtonIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
      <Title>{isShowTitle && music?.title}</Title>
    </Container>
  );
}

const Container = styled.div<{ $isShowTitle: boolean }>`
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
