import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";

export default function MusicInfo() {
  const music = useMusicDataFromId((state) => state.music);

  return (
    <Container>
      <div>
        <AlbumTitle>
          <span>{music?.albumTitle}</span>
        </AlbumTitle>
        <TitleAndSinger
          width="200px"
          title={music?.title}
          singer={music?.singer}
          size="large"
          $isWhiteSpace={false}
        />
      </div>
      <AlbumImg music={music!} size="middle" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlbumTitle = styled.div`
  span {
    color: rgba(255, 255, 255, 0.7);
  }
  margin-bottom: 15px;
`;
