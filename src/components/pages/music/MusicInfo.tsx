import styled from "styled-components";
import useGetMusicInfoById from "../../../hooks/useGetMusicInfoById";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";

export default function MusicInfo() {
  const musicInfo = useGetMusicInfoById()!;

  return (
    <Container>
      <div>
        <AlbumTitle>
          <span>{musicInfo.albumTitle}</span>
        </AlbumTitle>
        <TitleAndSinger
          width="200px"
          title={musicInfo.title}
          singer={musicInfo.singer}
          size="large"
        />
      </div>
      <AlbumImg musicInfo={musicInfo} type="middle" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 50px;
`;

const AlbumTitle = styled.div`
  span {
    color: rgba(255, 255, 255, 0.7);
  }
  margin-bottom: 15px;
`;
