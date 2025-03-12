import { faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import Controller from "../../shared/Controller";
import styled from "styled-components";
import { useControllerButtonsStore } from "./hooks";

export default function ControllerButtons() {
  const {
    state: { isRepeat, isShuffle },
    action: { toggleRepeat, toggleShuffle, toggleFadeAlertMessage },
  } = useControllerButtonsStore();

  return (
    <Container>
      <ButtonIcon
        active={isShuffle}
        icon={faShuffle}
        onClick={() => {
          toggleShuffle();
          if (isShuffle) {
            toggleFadeAlertMessage("셔플을 사용하지 않습니다.");
          } else {
            toggleFadeAlertMessage("셔플을 사용합니다.");
          }
        }}
      />
      <Controller width={170} size={[30, 40, 30]} />
      <ButtonIcon
        active={isRepeat}
        icon={faRepeat}
        onClick={() => {
          toggleRepeat();
          if (isRepeat) {
            toggleFadeAlertMessage("반복을 사용하지 않습니다.");
          } else {
            toggleFadeAlertMessage("현재 음악을 반복합니다.");
          }
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
