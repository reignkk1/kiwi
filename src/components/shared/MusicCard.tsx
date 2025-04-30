import styled from "styled-components";
import { TitleAndSinger } from "./TitleAndSinger";
import AlbumImg from "./AlbumImg";
import { markKeyword } from "../../utils";
import { MusicType } from "../../types";
import { useMusicCardStore } from "../../hooks/store/useMusicCardStore";

interface MusicCardProps {
  musicInfo: MusicType;
  mark?: string;
  $isMusicBar?: boolean;
}

export default function MusicCard({
  musicInfo,
  mark = "",
  $isMusicBar = false,
}: MusicCardProps) {
  const {
    action: { setIsPlay, setCurrentMusic },
  } = useMusicCardStore();

  return (
    <Container>
      <AlbumImg type="small" musicInfo={musicInfo} $isMusicBar={$isMusicBar} />
      <Info>
        <TitleAndSinger
          title={markKeyword(musicInfo.title, mark)}
          singer={markKeyword(musicInfo.singer, mark)}
          size="middle"
          width="250px"
          onClick={() => {
            setCurrentMusic(musicInfo);
            setIsPlay(true);
          }}
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
