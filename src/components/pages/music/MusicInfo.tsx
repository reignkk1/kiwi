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

// hooks 폴더에서 페이지 별로 나눠야 할듯? 그게 더 관리하기 쉬움
// store 폴더에서 나눈것 처럼

// 스크롤을 감지하여 내렸을 때 제목 뜨고 border 적용
// 제목 넘치면 밑으로 줄바꿈 ... 없애야함 props 변수로 구현 해야할듯?

// 다른 노래들 작사,작곡, 앨범 타이틀 등 데이터 입력하기

// 색깔 팔레트 상수로 빼기?
// 재생, 담기 로직, 더보기, 크레딧
