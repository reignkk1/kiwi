import styled from "styled-components";
import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";
import MusicHeader from "../components/pages/music/MusicHeader";
import MusicLyrics from "../components/pages/music/MusicLyrics";
import { useMusicScrollStore } from "../store/music/useMusicScrollStore";
import { useMusicDataFromId } from "../store/music/useMusicDataFromId";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicCredit from "../components/pages/music/MusicCredit";

export default function Music() {
  const { id } = useParams();
  const setScrollTop = useMusicScrollStore((state) => state.setScrollTop);
  const getMusicDataFromId = useMusicDataFromId(
    (state) => state.getMusicDataFromId
  );

  useEffect(() => {
    if (id) getMusicDataFromId(id);
  }, [id]);

  return (
    <Container onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <MusicHeader />
      <MusicInfo />
      <MusicControllerButtons />
      <MusicLyrics />
      <MusicCredit />
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
