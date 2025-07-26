import styled from "styled-components";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";
import { convertToGenreKorea } from "./../../../utils";
import InfoTable from "../../shared/InfoTable";
import TitleContent from "../../layout/TitleContent";

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
      <TitleContent title="크레딧">
        <MusicTitle>
          <span>{music?.title}</span>
        </MusicTitle>
        <InfoTable info={infoMap} />
      </TitleContent>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MusicTitle = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
`;
