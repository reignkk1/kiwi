import styled, { css } from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { addBasePath, getMusicDataFromSrc } from "../../utils";
import { Link } from "react-router-dom";
import usePlay from "../../hooks/usePlay";

const sizeMap = {
  small: {
    width: "50px",
    height: "50px",
  },
  middle: {
    width: "130px",
    height: "130px",
  },
  smallLarge: {
    width: "220px",
    height: "220px",
  },
  large: {
    width: "340px",
    height: "310px",
  },
};

interface AlbumImgProps {
  size: "small" | "middle" | "smallLarge" | "large";
  src: string;
  link?: string;
  isActiveButton?: boolean;
  $isMusicBar?: boolean;
}

export default function AlbumImg({
  size,
  src,
  link,
  isActiveButton = false,
  $isMusicBar = false,
}: AlbumImgProps) {
  const { width, height } = sizeMap[size];

  const music = getMusicDataFromSrc(src);
  const play = usePlay(music.id);

  return (
    <Container>
      {$isMusicBar && <MusicBarImg src={`${"./img/music-bar.gif"}`} />}
      {link ? (
        <Link to={link}>
          <BackGroundImg
            width={width}
            height={height}
            src={addBasePath(src)}
            $isMusicBar={$isMusicBar}
          />
        </Link>
      ) : (
        <BackGroundImg
          width={width}
          height={height}
          src={addBasePath(src)}
          $isMusicBar={$isMusicBar}
        />
      )}

      {isActiveButton && <ButtonIcon icon={faPlay} onClick={play} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  text-align: center;
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

const BackGroundImg = styled.img<{ $isMusicBar: boolean }>`
  border-radius: 5px;
  object-fit: fill;
  ${({ $isMusicBar }) =>
    $isMusicBar &&
    css`
      filter: brightness(40%);
    `}
`;

const MusicBarImg = styled.img`
  width: 30px;
  position: absolute;
  top: 13px;
  left: 10px;
  z-index: 3;
`;
