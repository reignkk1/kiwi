import styled, { css } from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { addBasePath } from "../../utils";
import { MusicType } from "./../../types";
import { useAlbumImgStore } from "../../hooks/store/useAlbumImgStore";

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
  type: "small" | "middle" | "smallLarge" | "large";
  musicInfo: MusicType;
  isActiveButton?: boolean;
  $isMusicBar?: boolean;
}

export default function AlbumImg({
  type,
  musicInfo,
  isActiveButton = false,
  $isMusicBar = false,
}: AlbumImgProps) {
  const {
    action: { setIsPlay, setCurrentMusic },
  } = useAlbumImgStore();

  const { width, height } = sizeMap[type];

  return (
    <Container>
      {$isMusicBar && <MusicBarImg src={`${"./img/music-bar.gif"}`} />}
      <BackGroundImg
        width={width}
        height={height}
        src={addBasePath(musicInfo.imgSrc)}
        $isMusicBar={$isMusicBar}
      />
      {isActiveButton && (
        <ButtonIcon
          icon={faPlay}
          onClick={() => {
            setCurrentMusic(musicInfo);
            setIsPlay(true);
          }}
        />
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
