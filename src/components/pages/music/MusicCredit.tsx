import styled from "styled-components";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";
import { convertToGenreKorea } from "./../../../utils";

export default function MusicCredit() {
  const music = useMusicDataFromId((state) => state.music);

  const InfoMap = [
    { title: "작사", value: music?.lyricist },
    { title: "작곡", value: music?.composer },
    { title: "편곡", value: music?.arranger },
    { title: "장르", value: convertToGenreKorea(music?.genre) },
  ];

  return (
    <Container>
      <Title>
        <span>크레딧</span>
      </Title>
      <MusicTitle>
        <span>{music?.title}</span>
      </MusicTitle>
      <Info>
        {InfoMap.map((info) => (
          <InfoList key={info.title} title={info.title} value={info.value} />
        ))}
      </Info>
    </Container>
  );
}

function InfoList({ title, value }: { title?: string; value?: string | null }) {
  return (
    <List>
      <ListTitle>
        <span>{title}</span>
      </ListTitle>
      <ListValue>
        <span>{value}</span>
      </ListValue>
    </List>
  );
}

const Container = styled.div`
  color: white;
  margin-bottom: 150px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MusicTitle = styled.div`
  font-size: 14px;
`;

const Info = styled.ul`
  margin-top: 30px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ListTitle = styled.div`
  color: rgba(255, 255, 255, 0.7);
`;
const ListValue = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
`;
