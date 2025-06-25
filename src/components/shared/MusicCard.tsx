import styled from "styled-components";
import { TitleAndSinger } from "./TitleAndSinger";
import AlbumImg from "./AlbumImg";
import { markKeyword } from "../../utils";
import usePlay from "../../hooks/usePlay";
import { MusicType } from "../../types";

interface MusicCardProps {
  music: MusicType;
  mark?: string;
  $isMusicBar?: boolean;
  $isAnimation?: boolean;
}

export default function MusicCard({
  music,
  mark = "",
  $isMusicBar = false,
  $isAnimation = false,
}: MusicCardProps) {
  const play = usePlay(music);

  return (
    <Container>
      <AlbumImg size="small" music={music} $isMusicBar={$isMusicBar} />
      <Info>
        <TitleAndSinger
          title={markKeyword(music.title, mark)}
          singer={markKeyword(music.singer, mark)}
          size="middle"
          width="250px"
          onClick={play}
          $isAnimation={$isAnimation}
        />
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
`;

const Info = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
