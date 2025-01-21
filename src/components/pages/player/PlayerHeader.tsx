import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { useAudioStore, useIsExpandLyricsStore } from "../../../store";
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AlbumImg from "../../shared/AlbumImg";
import { useNavigate } from "react-router-dom";

export default function PlayerHeader() {
  const navigate = useNavigate();
  const musicInfo = useAudioStore((state) => state.musicInfo);
  const isExpandLyrics = useIsExpandLyricsStore(
    (state) => state.isExpandLyrics
  );

  const isAnimation = musicInfo.title?.length > 20;

  return (
    <Container>
      {isExpandLyrics && <AlbumImg width={50} musicInfo={musicInfo} />}
      <Info>
        <Title isExpandLyrics={isExpandLyrics} isAnimation={isAnimation}>
          <h1>{musicInfo.title} &nbsp; &nbsp; &nbsp; &nbsp;</h1>
          {isAnimation && (
            <h1>{musicInfo.title} &nbsp; &nbsp; &nbsp; &nbsp;</h1>
          )}
        </Title>
        <Singer>
          <span>{musicInfo.singer}</span>
        </Singer>
      </Info>
      <Buttons>
        <ButtonIcon icon={faEllipsisV} size={20} />
        <ButtonIcon
          icon={faChevronDown}
          size={20}
          onClick={() => navigate(-1)}
        />
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Info = styled.div``;

const Title = styled.div<{ isAnimation: boolean; isExpandLyrics: boolean }>`
  display: flex;
  overflow: hidden;
  width: ${({ isExpandLyrics }) => (isExpandLyrics ? "200px" : "250px")};
  h1 {
    white-space: nowrap;
    font-size: 18px;
    font-weight: bold;
    color: var(--title-color);
    animation: marquee 15s linear infinite;
    animation-play-state: ${({ isAnimation }) =>
      isAnimation ? "running" : "paused"};
    animation-delay: 3s;

    @keyframes marquee {
      0% {
        transform: translateX(0%);
      }

      30% {
        transform: translateX(0%);
      }

      100% {
        transform: translateX(-100%);
      }
    }
  }
`;
const Singer = styled.div`
  color: var(--singer-color);
  font-size: 15px;
  margin-top: 10px;
`;

const Buttons = styled.div`
  button:first-child {
    margin-right: 10px;
  }
`;
