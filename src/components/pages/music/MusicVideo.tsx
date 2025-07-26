import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContent from "../../layout/TitleContent";
import Skeleton from "../../shared/Skeleton";

export default function MusicVideo() {
  const [video, setVideo] = useState<Array<object>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filterWords = ["TJ노래방"];

    const fetchData = async () => {
      try {
        const fetchVideos = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: "볼빨간사춘기 - 나의사춘기에게",
              type: "video",
              maxResults: 10,
              videoEmbeddable: true,
              key: "AIzaSyA_BV3WsTlXdV31W6X4tjFqZDOPKZyT8Oo",
            },
          }
        );

        const resolvedData = fetchVideos.data.items.filter((item: any) =>
          filterWords.some((word) => !item.snippet.channelTitle.includes(word))
        );

        setVideo(resolvedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TitleContent title="이 곡의 비디오">
      {!isLoading ? (
        <Container>
          {video?.map((data: any) => (
            <iframe
              key={data.id.videoId}
              width="350px"
              height="200px"
              src={`https://www.youtube.com/embed/${data.id.videoId}?modestbranding=1&rel=0`}
            ></iframe>
          ))}
        </Container>
      ) : (
        <Skeleton />
      )}
    </TitleContent>
  );
}

const Container = styled.div`
  display: flex;
  overflow: auto;
  padding: 10px;
  gap: 10px;
`;
