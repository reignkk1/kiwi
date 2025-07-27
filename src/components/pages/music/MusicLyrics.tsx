import styled from "styled-components";
import parser from "html-react-parser";
import { useState } from "react";
import { useMusicDataFromId } from "../../../store/music/useMusicDataFromId";
import TitleContent from "../../layout/TitleContent";

export default function MusicLyrics() {
  const music = useMusicDataFromId((state) => state.music);

  const [seeMore, setSeeMore] = useState(false);

  const lyrics =
    music &&
    (seeMore
      ? music.lyrics
      : music.lyrics.slice(0, Math.floor(music.lyrics.length / 2) + 1)
    ).reduce((acc, lyric) => (acc += lyric.text + "<br>"), "");

  return (
    <Container>
      <TitleContent title="가사">
        <Lyrics>
          <span>{parser(lyrics || "")}</span>
        </Lyrics>
        <More>
          <span onClick={() => setSeeMore((prev) => !prev)}>
            {seeMore ? "접기" : "더보기"}
          </span>
        </More>
      </TitleContent>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Lyrics = styled.div`
  line-height: 1.7;
`;

const More = styled.div`
  margin-top: 20px;
  span {
    cursor: pointer;
  }
`;
