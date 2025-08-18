import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "./ButtonIcon";
import styled from "styled-components";
import { is } from "../../utils";
import { useAudioStore } from "../../store/audio";
import { useShallow } from "zustand/react/shallow";
import {
  useAlertStore,
  useCurrentMusicStore,
  usePlayDirectionStore,
} from "../../store/shared";
import { useMusicDrawerStore } from "../../store/storage";
import { useKeyShortCut } from "../../hooks/useKeyShortCut";

interface ControllerProps {
  width: number;
  size?: [number, number, number] | number | any;
}

export default function Controller({ width, size = 18 }: ControllerProps) {
  const [isPlay, togglePlay] = useAudioStore(
    useShallow((state) => [state.isPlay, state.togglePlay])
  );
  const setPlayDirection = usePlayDirectionStore(
    (state) => state.setPlayDirection
  );
  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );
  const musicDrawer = useMusicDrawerStore((state) => state.musicDrawer);
  const currnetMusic = useCurrentMusicStore((state) => state.currentMusic);

  const isMusicDrawer = musicDrawer.length > 0;

  const handleMusicDrawerCheck = (direction: "next" | "prev") => {
    if (!isMusicDrawer) {
      return toggleFadeAlertMessage("음악서랍에 곡이 없습니다.");
    }
    setPlayDirection(direction);
  };

  const getSize = (index: number) => (is.number(size) ? size : size[index]);

  const onClickPlay = () => {
    // 만약 현재 곡이 지정되어 있지 않고 비어있을 경우
    // 플레이 버튼은 작동하지 않음.
    if (Object.keys(currnetMusic).length) {
      togglePlay();
    }
  };

  const onClickPrev = () => handleMusicDrawerCheck("prev");
  const onClickNext = () => handleMusicDrawerCheck("next");

  const setKeyShortCut = useKeyShortCut();
  setKeyShortCut("k", onClickPlay);

  return (
    <Container width={width}>
      <ButtonIcon
        ariaLabel="이전"
        title="이전"
        icon={faBackwardStep}
        onClick={onClickPrev}
        size={getSize(0)}
      />
      <ButtonIcon
        ariaLabel={isPlay ? "일시정지(단축키 k)" : "재생(단축키 k)"}
        title={isPlay ? "일시정지(k)" : "재생(k)"}
        ariaKeyShortCuts="k"
        icon={isPlay ? faPause : faPlay}
        onClick={onClickPlay}
        size={getSize(1)}
      />
      <ButtonIcon
        ariaLabel="다음"
        title="다음"
        icon={faForwardStep}
        onClick={onClickNext}
        size={getSize(2)}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width + "px"};
`;
