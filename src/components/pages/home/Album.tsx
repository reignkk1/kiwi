import styled from "styled-components";
import AlbumImg from "../../shared/AlbumImg";
import { TitleAndSinger } from "../../shared/TitleAndSinger";

interface AlbumProps {
  title: string;
  singer: string;
  imgSrc: string;
  link: string;
}

export default function Album({ title, singer, imgSrc, link }: AlbumProps) {
  return (
    <AlbumTemplate>
      <AlbumImg size="middle" src={imgSrc} link={link} isActiveButton={true} />
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
