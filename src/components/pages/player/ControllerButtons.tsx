import { faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import Controller from "../../shared/Controller";
import styled from "styled-components";
import useControllerButtonsHandler from "../../../hooks/useControllerButtonsHandler";

export default function ControllerButtons() {
  const { handleRepeatClick, handleShuffleClick, isRepeat, isShuffle } =
    useControllerButtonsHandler();

  return (
    <Container>
      <ButtonIcon
        active={isShuffle}
        icon={faShuffle}
        onClick={handleShuffleClick}
      />
      <Controller width={170} size={[30, 40, 30]} />
      <ButtonIcon
        active={isRepeat}
        icon={faRepeat}
        onClick={handleRepeatClick}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
