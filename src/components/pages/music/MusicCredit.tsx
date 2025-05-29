import styled from "styled-components";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";
import { convertToGenreKorea } from "./../../../utils";
import InfoTable from "../../shared/InfoTable";

export default function MusicCredit() {
  const music = useMusicDataFromId((state) => state.music);

  const infoMap = [
    { key: "작사", value: music?.lyricist },
    { key: "작곡", value: music?.composer },
    { key: "편곡", value: music?.arranger },
    { key: "장르", value: convertToGenreKorea(music?.genre) },
  ];

  return (
    <Container>
      <Title>
        <span>크레딧</span>
      </Title>
      <MusicTitle>
        <span>{music?.title}</span>
      </MusicTitle>
      <InfoTable info={infoMap} />
    </Container>
  );
}

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const MusicTitle = styled.div`
  font-size: 15px;
`;
