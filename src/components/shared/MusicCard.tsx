import styled from "styled-components";
import { TitleAndSinger } from "./TitleAndSinger";
import AlbumImg from "./AlbumImg";
import { MusicType } from "./types";
import { markKeyword } from "../../utils";
import { useMusicCardStore } from "./hooks";

interface MusicCardProps {
  musicInfo: MusicType;
  mark: string;
}

export default function MusicCard({ musicInfo, mark }: MusicCardProps) {
  const {
    action: { musicPlay },
  } = useMusicCardStore();

  return (
    <Container>
      <AlbumImg type="small" musicInfo={musicInfo} />
      <Info>
        <TitleAndSinger
          title={markKeyword(musicInfo.title, mark)}
          singer={markKeyword(musicInfo.singer, mark)}
          size="middle"
          width="250px"
          onClick={() => musicPlay(musicInfo)}
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
  mark {
    background: none;
    color: var(--signature-color);
  }
`;
