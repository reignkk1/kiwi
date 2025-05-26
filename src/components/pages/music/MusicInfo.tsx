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
  padding-top: 50px;
`;

const AlbumTitle = styled.div`
  span {
    color: rgba(255, 255, 255, 0.7);
  }
  margin-bottom: 15px;
`;

// hooks 폴더에서 페이지 별로 나눠야 할듯? 그게 더 관리하기 쉬움
// store 폴더에서 나눈것 처럼

// 다른 노래들 작사,작곡, 앨범 타이틀 등 데이터 입력하기

// 색깔 팔레트 상수로 빼기?
// 인포는 완료 커밋
