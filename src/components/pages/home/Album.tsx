import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";
import { MusicType } from "../../../types";

interface AlbumProps {
  music: MusicType;
}

export default function Album({ music }: AlbumProps) {
  return (
    <AlbumTemplate>
      <AlbumImg
        size="middle"
        music={music}
        isLink={true}
        isActiveButton={true}
      />
      <TitleAndSinger
        width="100%"
        title={music.title}
        singer={music.singer}
        size="small"
      />
    </AlbumTemplate>
  );
}

const AlbumTemplate = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
