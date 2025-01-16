import styled from "styled-components";
import { MusicType } from "../../../types";
import AlbumImg from "../../shared/AlbumImg";

export default function Album({ musicInfo }: { musicInfo: MusicType }) {
  return (
    <AlbumTemplate>
      <AlbumImg width={130} musicInfo={musicInfo} isActiveButton={true} />
      <AlbumInfo>
        <Title>{musicInfo.title}</Title>
        <Singer>{musicInfo.singer}</Singer>
      </AlbumInfo>
    </AlbumTemplate>
  );
}

const AlbumTemplate = styled.div`
  width: 130px;
`;

const AlbumInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;
const Title = styled.div`
  color: white;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;
const Singer = styled.div`
  color: var(--singer-color);
`;
