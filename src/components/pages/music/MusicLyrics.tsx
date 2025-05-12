import styled from "styled-components";
import useGetMusicInfoById from "../../../hooks/useGetMusicInfoById";
import parser from "html-react-parser";

export default function MusicLyrics() {
  const musicInfo = useGetMusicInfoById()!;

  const lyrics = musicInfo.lyrics.reduce(
    (acc, lyric) => (acc += lyric.text + "<br>"),
    ""
  );

  return (
    <Container>
      <Title>
        <span>가사</span>
      </Title>
      <Lyrics>
        <span>{parser(lyrics)}</span>
      </Lyrics>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  margin-top: 40px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Lyrics = styled.div`
  line-height: 1.7;
`;
