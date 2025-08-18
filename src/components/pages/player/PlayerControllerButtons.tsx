import { faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import Controller from "../../shared/Controller";
import styled from "styled-components";
import useControllerButtonsHandler from "../../../hooks/useControllerButtonsHandler";

export default function PlayerControllerButtons() {
  const { handleRepeatClick, handleShuffleClick, isLoop, isShuffle } =
    useControllerButtonsHandler();

  return (
    <Container>
      <ButtonIcon
        ariaLabel="셔플"
        title={isShuffle ? "랜덤재생 해제" : "랜덤재생"}
        active={isShuffle}
        icon={faShuffle}
        onClick={handleShuffleClick}
      />
      <Controller width={170} size={[30, 40, 30]} />
      <ButtonIcon
        ariaLabel="반복"
        title={isLoop ? "반복재생 해제" : "반복재생"}
        active={isLoop}
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
