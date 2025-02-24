import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { MusicType } from "../../shared/types";
import { TitleAndSinger } from "../../shared/TitleAndSinger";

interface AlbumProps {
  musicInfo: MusicType;
}

export default function Album({ musicInfo }: AlbumProps) {
  const { title, singer } = musicInfo;
  return (
    <AlbumTemplate>
      <AlbumImg type="middle" musicInfo={musicInfo} isActiveButton={true} />
      <TitleAndSinger width="100%" title={title} singer={singer} size="small" />
    </AlbumTemplate>
  );
}

const AlbumTemplate = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
