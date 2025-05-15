import styled from "styled-components";
import { TitleAndSinger } from "./TitleAndSinger";
import AlbumImg from "./AlbumImg";
import { markKeyword } from "../../utils";
import usePlay from "../../hooks/usePlay";

interface MusicCardProps {
  id: number;
  title: string;
  singer: string;
  imgSrc: string;
  mark?: string;
  $isMusicBar?: boolean;
  $isAnimation?: boolean;
}

export default function MusicCard({
  id,
  title,
  singer,
  imgSrc,
  mark = "",
  $isMusicBar = false,
  $isAnimation = false,
}: MusicCardProps) {
  const play = usePlay(id);

  return (
    <Container>
      <AlbumImg size="small" src={imgSrc} $isMusicBar={$isMusicBar} />
      <Info>
        <TitleAndSinger
          title={markKeyword(title, mark)}
          singer={markKeyword(singer, mark)}
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
`;

const Info = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
