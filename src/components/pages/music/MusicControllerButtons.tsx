import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { palette } from "../../../constant";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import usePlay from "../../../hooks/usePlay";
import { useParams } from "react-router-dom";
import usePutInMusicDrawer from "../../../hooks/usePutInMusicDrawer";
import { getMusicDataFromId } from "../../../utils";

export default function MusicControllerButtons() {
  const { id } = useParams();
  const music = getMusicDataFromId(id);

  const play = usePlay(music);
  const putInMusicDrawer = usePutInMusicDrawer(id);

  return (
    <Container>
      <ControllerButton onClick={play} icon={faPlay} text="재생" />
      <ControllerButton onClick={putInMusicDrawer} icon={faPlus} text="담기" />
    </Container>
  );
}

interface ControllerButtonProps {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

function ControllerButton({ icon, text, onClick }: ControllerButtonProps) {
  return (
    <ButtonContainer onClick={onClick}>
      <ButtonIcon icon={icon} />
      <Text>
        <span>{text}</span>
      </Text>
    </ButtonContainer>
  );
}
const Container = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  gap: 10px;
`;

const ButtonContainer = styled.button`
  width: 50%;
  background-color: ${palette.textButton};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px 0px;
`;

const Text = styled.div`
  color: white;
  margin-left: 5px;
  font-size: 16px;
  margin-bottom: 3px;
`;
