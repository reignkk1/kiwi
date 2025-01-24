import styled from "styled-components";
import { useAudioStore } from "../../store";
import { MusicType } from "../../types";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

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
  const play = useAudioStore((state) => state.play);
  const onClickPlayButton = () => play(musicInfo);

  const size = {
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

  return (
    <Container>
      <Img
        width={size[type].width}
        height={size[type].height}
        src={musicInfo.imgSrc}
      />
      {isActiveButton && (
        <ButtonIcon icon={faPlay} color="white" onClick={onClickPlayButton} />
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
