import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import Controller from "../../shared/Controller";
import styled from "styled-components";

export default function Control() {
  return (
    <Container>
      <ButtonIcon icon={faShuffle} />
      <Controller width={170} size={[30, 40, 30]} />
      <ButtonIcon icon={faShuffle} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
