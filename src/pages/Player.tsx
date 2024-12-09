import styled from "styled-components";
import { useAudioStore } from "../store";
import { useEffect, useState } from "react";
import { ButtonIcon } from "../components/shared/ButtonIcon";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "../components/shared/ProgressBar";

export default function Player() {
  const { musicInfo } = useAudioStore();
  const [animation, setAnymation] = useState(false);

  useEffect(() => {
    if (musicInfo.title?.length > 20) {
      setAnymation(true);
    }
  }, []);

  console.log("render");

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
        <ButtonIcon icon={faChevronDown} size="20px" />
      </Header>
      <MusicInfo>
        <img src={musicInfo.imgSrc} />
      </MusicInfo>
      <div>
        {/* <ProgressBar /> */}
        <TimeStamp>
          <span></span>
          <span>{}</span>
        </TimeStamp>
      </div>
      <Controller></Controller>
    </Container>
  );
}

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

const Controller = styled.div``;

const TimeStamp = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 10px;
  font-size: 14px;
`;
