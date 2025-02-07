import styled from "styled-components";
import { usePlayerMenuStore } from "./hooks";
import { useEffect } from "react";
import AlbumImg from "../../shared/AlbumImg";

export default function PlayerMenu() {
  const {
    state: { musicInfo },
    action: { closePlayerMenu },
  } = usePlayerMenuStore();

  useEffect(() => {
    return () => {
      closePlayerMenu();
    };
  }, []);

  return (
    <Container>
      <MusicInfo>
        <AlbumImg type="smallLarge" musicInfo={musicInfo} />
        <div>{musicInfo.title}</div>
        <div>{musicInfo.singer}</div>
      </MusicInfo>
      <ul>
        <li>곡 정보</li>
        <li>앨범 정보</li>
        <li>담기</li>
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 64px;
`;

const MusicInfo = styled.div`
  text-align: center;
`;

// 애니메이션, list menu 구현
