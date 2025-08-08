import { faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";
import styled from "styled-components";
import { useMutedStore } from "../../../store/player/useMutedStore";
import { useShallow } from "zustand/react/shallow";

export default function PlayerVolume() {
  const [isMuted, toggleMuted] = useMutedStore(
    useShallow((state) => [state.isMuted, state.toggleMuted])
  );

  return (
    <Container>
      <ButtonIcon
        onClick={() => {
          console.log(isMuted);
          toggleMuted();
        }}
        ariaLabel="볼륨조절"
        icon={isMuted ? faVolumeMute : faVolumeLow}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
