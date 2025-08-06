import { useEffect, useRef } from "react";
import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { useSeekStore } from "../../../store/audio/useSeekStore";
import { useAudioStore } from "../../../store/audio";
import { useCurrentMusicStore } from "../../../store/shared";
import {
  useIsExpandLyricsStore,
  useIsLyricsClickedStore,
} from "../../../store/player";
import { useShallow } from "zustand/react/shallow";

export default function LyricsAndImage() {
  const seeking = useSeekStore((state) => state.seeking);
  const currentTime = useAudioStore((state) => state.currentTime);
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic);

  const [isLyricsClicked, clickLyrics, unclickedLyrics] =
    useIsLyricsClickedStore(
      useShallow((state) => [
        state.isLyricsClicked,
        state.clickLyrics,
        state.unclickedLyrics,
      ])
    );

  const [isExpandLyrics, setIsExpandLyrics, toggleExpandLyrics] =
    useIsExpandLyricsStore(
      useShallow((state) => [
        state.isExpandLyrics,
        state.setIsExpandLyrics,
        state.toggleExpandLyrics,
      ])
    );

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
      <AlbumImg size="large" music={currentMusic} />
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
              $seeking={seeking}
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
  height: 435px;
  img {
    animation: ${({ $isExpandLyrics, $isLyricsClicked }) =>
        $isExpandLyrics || !$isLyricsClicked ? "hide" : "show"}
      0.3s forwards;

    animation-play-state: ${({ $isLyricsClicked }) =>
      $isLyricsClicked ? "running" : "paused"};
  }

  @media (max-height: 760px) and (max-width: 479px) {
    height: 400px;
    img {
      width: 300px;
      height: 270px;
    }
  }

  @media (max-height: 720px) and (max-width: 479px) {
    height: 380px;
    img {
      width: 280px;
      height: 250px;
    }
  }

  @media (max-height: 680px) and (max-width: 479px) {
    height: 340px;
    img {
      width: 250px;
      height: 220px;
    }
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
  $seeking: boolean;
}>`
  color: ${({ $active, $seeking }) =>
    $seeking
      ? "rgba(255, 255, 255, 0.2)"
      : $active
      ? "white"
      : " rgba(255, 255, 255, 0.5)"};
`;
