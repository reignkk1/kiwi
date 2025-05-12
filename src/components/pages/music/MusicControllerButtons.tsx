import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { palette } from "../../../constant";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function MusicControllerButtons() {
  return (
    <Container>
      <ControllerButton icon={faPlay} text="재생" />
      <ControllerButton icon={faPlus} text="담기" />
    </Container>
  );
}

function ControllerButton({ icon, text }: { icon: IconProp; text: string }) {
  return (
    <ButtonContainer>
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
