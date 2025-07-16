import styled, { css } from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { addBasePath } from "../../utils";
import { Link } from "react-router-dom";
import usePlay from "../../hooks/usePlay";
import { MusicType } from "../../types";

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
  music?: MusicType | null;
  isLink?: boolean;
  isActiveButton?: boolean;
  $isMusicBar?: boolean;
}

export default function AlbumImg({
  size,
  music,
  isLink = false,
  isActiveButton = false,
  $isMusicBar = false,
}: AlbumImgProps) {
  const { width, height } = sizeMap[size];

  const play = usePlay(music);

  return (
    <Container>
      {$isMusicBar && (
        <MusicBarImg alt="재생중" src={`${"./img/music-bar.gif"}`} />
      )}
      {isLink ? (
        <Link to={`/music/${music?.id}`}>
          <BackGroundImg
            alt={music?.albumTitle}
            width={width}
            height={height}
            src={addBasePath(music?.imgSrc)}
            $isMusicBar={$isMusicBar}
          />
        </Link>
      ) : (
        <BackGroundImg
          alt={music?.albumTitle}
          width={width}
          height={height}
          src={addBasePath(music?.imgSrc)}
          $isMusicBar={$isMusicBar}
        />
      )}

      {isActiveButton && (
        <ButtonIcon ariaLabel="재생" icon={faPlay} onClick={play} />
      )}
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
