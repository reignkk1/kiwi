import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";

export default function PlayerVolume() {
  return (
    <Container>
      <ButtonIcon ariaLabel="볼륨조절" icon={faVolumeLow} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
