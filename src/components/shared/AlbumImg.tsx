import styled from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAlbumImgStore } from "./hooks";
import { MusicType } from "./types";

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
}

export default function AlbumImg({
  type,
  musicInfo,
  isActiveButton = false,
}: AlbumImgProps) {
  const {
    action: { playMusic },
  } = useAlbumImgStore();

  const { width, height } = sizeMap[type];

  return (
    <Container>
      <Img width={width} height={height} src={musicInfo.imgSrc} />
      {isActiveButton && (
        <ButtonIcon
          icon={faPlay}
          color="white"
          onClick={() => playMusic(musicInfo)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

const Img = styled.img`
  border-radius: 5px;
  object-fit: fill;
`;
