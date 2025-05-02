import { useEffect, useRef } from "react";
import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { useLyricsAndImageStore } from "../../../hooks/store/useLyricsAndImageStore";

export default function LyricsAndImage() {
  const {
    state: {
      currentMusic,
      currentTime,
      isExpandLyrics,
      isExpandProgressBar,
      isLyricsClicked,
    },
    action: {
      setIsExpandLyrics,
      toggleExpandLyrics,
      clickLyrics,
      unclickedLyrics,
    },
  } = useLyricsAndImageStore();

  const activeLyricsText = useRef<HTMLDivElement>(null);
  const cleanedCurrentTime = Math.floor(currentTime);

  useEffect(() => {
    if (!isExpandLyrics) {
      activeLyricsText.current?.scrollIntoView(true);
    }
  }, [currentTime, isExpandLyrics]);

  useEffect(() => {
    return () => {
      setIsExpandLyrics(false);
      unclickedLyrics();
    };
  }, [setIsExpandLyrics, unclickedLyrics]);

  return (
    <Container
      $isExpandLyrics={isExpandLyrics}
      $isLyricsClicked={isLyricsClicked}
    >
      <AlbumImg type="large" musicInfo={currentMusic} />
      <LyricsContainer
        $isExpandLyrics={isExpandLyrics}
        onClick={() => {
          clickLyrics();
          toggleExpandLyrics();
        }}
      >
        {currentMusic.lyrics?.map(({ text, startTime, endTime }) => {
          const isActive =
            startTime <= cleanedCurrentTime && cleanedCurrentTime <= endTime;
          return (
            <LyricsText
              ref={isActive ? activeLyricsText : null}
              $active={isActive}
              $isExpandProgressBar={isExpandProgressBar}
              key={startTime}
            >
              <span>{text}</span>
            </LyricsText>
          );
        })}
      </LyricsContainer>
    </Container>
  );
}

const Container = styled.div<{
  $isExpandLyrics: boolean;
  $isLyricsClicked: boolean;
}>`
  width: 100%;
  height: 450px;
  img {
    animation: ${({ $isExpandLyrics, $isLyricsClicked }) =>
        $isExpandLyrics || !$isLyricsClicked ? "hide" : "show"}
      0.3s forwards;

    animation-play-state: ${({ $isLyricsClicked }) =>
      $isLyricsClicked ? "running" : "paused"};
  }

  @keyframes hide {
    0% {
    }

    100% {
      transform: translate(-170px, -75px);
      width: 0px;
      height: 0px;
    }
  }

  @keyframes show {
    0% {
      transform: translate(-170px, -75px);
      width: 0px;
      height: 0px;
    }

    100% {
    }
  }
`;

const LyricsContainer = styled.div<{ $isExpandLyrics: boolean }>`
  height: ${({ $isExpandLyrics }) => ($isExpandLyrics ? "100%" : "100px")};
  text-align: ${({ $isExpandLyrics }) =>
    $isExpandLyrics ? "start" : "center"};
  overflow-y: ${({ $isExpandLyrics }) => ($isExpandLyrics ? "auto" : "hidden")};
  font-size: ${({ $isExpandLyrics }) => ($isExpandLyrics ? "16px" : "15px")};
  line-height: ${({ $isExpandLyrics }) => ($isExpandLyrics ? "2" : "1.7")};
  padding: ${({ $isExpandLyrics }) =>
    $isExpandLyrics ? "0px 0px 30px 0px" : ""};
  margin: ${({ $isExpandLyrics }) =>
    $isExpandLyrics ? "0px 0px 20px 0px" : "18px 0px"};
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  transition: all 0.3s;
`;

const LyricsText = styled.div<{
  $active: boolean;
  $isExpandProgressBar: boolean;
}>`
  color: ${({ $active, $isExpandProgressBar }) =>
    $isExpandProgressBar
      ? "rgba(255, 255, 255, 0.2)"
      : $active
      ? "white"
      : " rgba(255, 255, 255, 0.5)"};
`;
