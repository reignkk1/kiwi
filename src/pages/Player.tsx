import styled from "styled-components";
import { useAudioStore } from "../store";
import { useEffect, useState } from "react";
import { ButtonIcon } from "../components/shared/ButtonIcon";
import { faChevronDown, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "../components/shared/ProgressBar";
import TimeStamp from "../components/pages/player/TimeStamp";
import Controller from "../components/shared/Controller";

export default function Player() {
  const musicInfo = useAudioStore((state) => state.musicInfo);
  const [animation, setAnymation] = useState(false);

  useEffect(() => {
    if (musicInfo.title?.length > 20) {
      setAnymation(true);
    }
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <Title isAnimation={animation}>
            <h1>{musicInfo.title} &nbsp; &nbsp; &nbsp; &nbsp;</h1>
            {animation && (
              <h1>{musicInfo.title} &nbsp; &nbsp; &nbsp; &nbsp;</h1>
            )}
          </Title>
          <Singer>
            <span>{musicInfo.singer}</span>
          </Singer>
        </div>
        <ButtonIcon icon={faChevronDown} size={20} />
      </Header>
      <MusicInfo>
        <img src={musicInfo.imgSrc} />
      </MusicInfo>
      <div>
        <ProgressBar />
        <TimeStamp />
      </div>
      <ControlContainer>
        <ButtonIcon icon={faShuffle} />
        <Controller width={170} size={[30, 40, 30]} />
        <ButtonIcon icon={faShuffle} />
      </ControlContainer>
    </Container>
  );
}
const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div<{ isAnimation: boolean }>`
  display: flex;
  overflow: hidden;
  width: 250px;
  h1 {
    white-space: nowrap;
    font-size: 20px;
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
  margin-top: 10px;
`;

const MusicInfo = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
  }
`;
