import MusicInfo from "../components/pages/music/MusicInfo";
import MusicControllerButtons from "../components/pages/music/MusicControllerButtons";
import MusicLyrics from "../components/pages/music/MusicLyrics";
import { useMusicDataFromId } from "../store/music/useMusicDataFromId";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicCredit from "../components/pages/music/MusicCredit";
import ScrollTitleLayout from "../components/layout/ScrollTitleLayout";
import MusicVideo from "../components/pages/music/MusicVideo";
import styled from "styled-components";
import Skeleton from "../components/shared/Skeleton";

export default function Music() {
  const { id } = useParams();
  const getMusicDataFromId = useMusicDataFromId(
    (state) => state.getMusicDataFromId
  );
  const music = useMusicDataFromId((state) => state.music);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getMusicDataFromId(id);
      setIsLoading(false);
    }
  }, [id]);

  return !isLoading ? (
    <ScrollTitleLayout title={music?.title}>
      <MusicInfo />
      <MusicControllerButtons />
      <MusicLyrics />
      <MusicCredit />
      <MusicVideo />
    </ScrollTitleLayout>
  ) : (
    <MusicPageSkeleton />
  );
}

function MusicPageSkeleton() {
  return (
    <Container>
      <TopSheet>
        <Left>
          <Skeleton width="200" height="50" />
          <Skeleton width="200" height="50" />
        </Left>
        <Right>
          <Skeleton width="100" height="100" />
        </Right>
      </TopSheet>
      <MiddleSheet>
        <Skeleton width="150" height="60" />
        <Skeleton width="150" height="60" />
      </MiddleSheet>
      <BottomSheet>
        <Skeleton width="350" height="250" />
      </BottomSheet>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 64px 0px 150px 0px;
`;
const TopSheet = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Right = styled.div``;

const MiddleSheet = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BottomSheet = styled.div``;
