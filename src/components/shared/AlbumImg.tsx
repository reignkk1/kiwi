import styled, { css } from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAlbumImgStore } from "./hooks";
import { MusicType } from "./types";
import { addBasePath } from "../../utils";

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
  musicInfo: Partial<MusicType>;
  isActiveButton?: boolean;
  isMusicBar?: boolean;
  animation?: boolean;
}

export default function AlbumImg({
  type,
  musicInfo,
  isActiveButton = false,
  isMusicBar = false,
  animation = false,
}: AlbumImgProps) {
  const {
    action: { setIsPlay, setMusicInfo },
  } = useAlbumImgStore();

  const { width, height } = sizeMap[type];

  return (
    <Container>
      {isMusicBar && <MusicBarImg src={`${"./img/music-bar.gif"}`} />}
      <BackGroundImg
        width={width}
        height={height}
        src={addBasePath(musicInfo.imgSrc)}
        isMusicBar={isMusicBar}
        animation={animation}
      />
      {isActiveButton && (
        <ButtonIcon
          icon={faPlay}
          color="white"
          onClick={() => {
            setMusicInfo(musicInfo);
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

const BackGroundImg = styled.img<{ isMusicBar: boolean; animation?: boolean }>`
  border-radius: 5px;
  object-fit: fill;
  ${({ isMusicBar }) =>
    isMusicBar &&
    css`
      filter: brightness(40%);
    `}

  ${({ animation }) =>
    animation &&
    css`
      animation: abc 1s;
    `}

    @keyframes abc {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MusicBarImg = styled.img`
  width: 30px;
  position: absolute;
  top: 13px;
  left: 10px;
  z-index: 3;
`;
