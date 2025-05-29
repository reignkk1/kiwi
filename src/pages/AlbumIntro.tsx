import { useEffect } from "react";
import ScrollTitleLayout from "../components/layout/ScrollTitleLayout";
import { useParams } from "react-router-dom";
import { useMusicDataFromId } from "../store/music/useMusicDataFromId";
import AlbumImg from "./../components/shared/AlbumImg";
import { TitleAndSinger } from "../components/shared/TitleAndSinger";
import styled from "styled-components";
import InfoTable from "../components/shared/InfoTable";
import { convertToGenreKorea } from "../utils";
import parser from "html-react-parser";

export default function AlbumIntro() {
  const { id } = useParams();

  const getMusicDataFromId = useMusicDataFromId(
    (state) => state.getMusicDataFromId
  );
  const music = useMusicDataFromId((state) => state.music);

  useEffect(() => {
    if (id) getMusicDataFromId(id);
  }, [id, getMusicDataFromId]);

  const infoMap = [
    { key: "장르", value: convertToGenreKorea(music?.genre) },
    { key: "발매일", value: music?.releaseDate },
    { key: "발매사", value: music?.publisher },
    { key: "기획사", value: music?.composer },
  ];

  return (
    <ScrollTitleLayout title={music?.albumTitle}>
      <AlbumImg music={music!} size="smallLarge" />
      <TitleAndSinger
        title={music?.albumTitle}
        singer={music?.singer}
        size="middle"
      />
      <Info>
        <Title>상세 정보</Title>
        <InfoTable info={infoMap} />
      </Info>
      <Intro>
        <Title>앨범 소개</Title>
        <P>{parser(music?.albumIntro || "")}</P>
      </Intro>
    </ScrollTitleLayout>
  );
}

const Info = styled.div``;

const Intro = styled.div``;
const P = styled.p`
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

const Title = styled.h2`
  color: white;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 30px;
`;
