import styled from "styled-components";
import { useAudioStore } from "../../store";
import { useEffect } from "react";

export function ProgressBar() {
  const audio = useAudioStore((state) => state.audio);
  const progressPercent = useAudioStore((state) => state.progressPercent);
  const setProgressPercent = useAudioStore((state) => state.setProgressPercent);

  useEffect(() => {
    audio.ontimeupdate = () => setProgressPercent();

    return () => audio.removeEventListener("timeupdate", setProgressPercent);
  }, []);

  return <Container progressPercent={progressPercent} />;
}

const Container = styled.div<{ progressPercent: number }>`
  width: ${({ progressPercent }) => `${progressPercent}%`};
  height: 2px;
  background-color: var(--signature-color);
`;
