import styled from "styled-components";
import { useAudioStore } from "../../store";
import { MusicType } from "../../types";
import { ButtonIcon } from "./ButtonIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface AlbumImgProps {
  width?: number;
  height?: number;
  musicInfo: MusicType;
  isActiveButton?: boolean;
}

export default function AlbumImg({
  width,
  height,
  musicInfo,
  isActiveButton = false,
}: AlbumImgProps) {
  const play = useAudioStore((state) => state.play);
  const onClickPlayButton = () => play(musicInfo);

  return (
    <Container>
      <Img
        width={width ?? "100%"}
        height={height ?? "100%"}
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
