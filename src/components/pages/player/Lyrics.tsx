import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  useAudioStore,
  useIsExpandLyricsStore,
  useIsExpandStore,
} from "../../../store";
import { useShallow } from "zustand/react/shallow";
import AlbumImg from "../../shared/AlbumImg";

export default function Lyrics() {
  const musicInfo = useAudioStore((state) => state.musicInfo);
  const isExpand = useIsExpandStore((state) => state.isExpand);
  const [isExpandLyrics, toggleExpandLyrics, setIsExpandLyrics] =
    useIsExpandLyricsStore(
      useShallow((state) => [
        state.isExpandLyrics,
        state.toggleExpandLyrics,
        state.setIsExpandLyrics,
      ])
    );

  const [clicked, setClicked] = useState<boolean>(false);

  const currentTime = Math.floor(useAudioStore((state) => state.currentTime));
  const activeLyricsText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpandLyrics) {
      activeLyricsText.current?.scrollIntoView(true);
    }
  }, [currentTime, isExpandLyrics]);

  useEffect(() => {
    return () => {
      setIsExpandLyrics(false);
    };
  }, []);

  return (
    <Container clicked={clicked} isExpandLyrics={isExpandLyrics}>
      <AlbumImg height={320} musicInfo={musicInfo} />
      <LyricsContainer
        isExpandLyrics={isExpandLyrics}
        onClick={() => {
          setClicked(true);
          toggleExpandLyrics();
        }}
      >
        {musicInfo.lyrics.map(({ text, startTime, endTime }) => {
          const isActive = startTime <= currentTime && currentTime <= endTime;
          return (
            <LyricsText
              ref={isActive ? activeLyricsText : null}
              active={isActive}
              isExpand={isExpand}
            >
              <span>{text}</span>
            </LyricsText>
          );
        })}
      </LyricsContainer>
    </Container>
  );
}

const Container = styled.div<{ isExpandLyrics: boolean; clicked: boolean }>`
  height: 440px;
  width: 340px;

  img {
    animation: ${({ isExpandLyrics, clicked }) =>
        isExpandLyrics || !clicked ? "hide" : "show"}
      0.3s forwards;

    animation-play-state: ${({ clicked }) => (clicked ? "running" : "paused")};
  }
  @keyframes hide {
    0% {
    }

    100% {
      transform: translateY(-70px);
      width: 0px;
      height: 0px;
    }
  }

  @keyframes show {
    0% {
      transform: translateY(-70px);
      width: 0px;
      height: 0px;
    }

    100% {
    }
  }
`;

const LyricsContainer = styled.div<{ isExpandLyrics: boolean }>`
  width: 100%;
  height: ${({ isExpandLyrics }) => (isExpandLyrics ? "100%" : "100px")};
  text-align: ${({ isExpandLyrics }) => (isExpandLyrics ? "start" : "center")};
  overflow-y: ${({ isExpandLyrics }) => (isExpandLyrics ? "auto" : "hidden")};
  font-size: ${({ isExpandLyrics }) => (isExpandLyrics ? "16px" : "15px")};
  line-height: ${({ isExpandLyrics }) => (isExpandLyrics ? "2" : "1.7")};
  padding: ${({ isExpandLyrics }) =>
    isExpandLyrics ? "0px 0px 30px 0px" : ""};
  margin: ${({ isExpandLyrics }) =>
    isExpandLyrics ? "0px 0px 20px 0px" : "18px 0px"};
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;

const LyricsText = styled.div<{ active: boolean; isExpand: boolean }>`
  color: ${({ active, isExpand }) =>
    isExpand
      ? "rgba(255, 255, 255, 0.2)"
      : active
      ? "white"
      : " rgba(255, 255, 255, 0.5)"};
`;
