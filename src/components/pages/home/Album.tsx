import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { MusicType } from "../../../types";
import { Link } from "react-router-dom";

interface AlbumProps {
  musicInfo: MusicType;
}

export default function Album({ musicInfo }: AlbumProps) {
  const { title, singer } = musicInfo;
  return (
    <AlbumTemplate>
      <Link to={`/music/${musicInfo.id}`}>
        <AlbumImg type="middle" musicInfo={musicInfo} isActiveButton={true} />
      </Link>
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
