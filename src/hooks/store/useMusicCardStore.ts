import { useAudioStore } from "../../store/audio";
import { useCurrentMusicStore } from "../../store/shared";

export function useMusicCardStore() {
  const setIsPlay = useAudioStore((state) => state.setIsPlay);
  const setCurrentMusic = useCurrentMusicStore(
    (state) => state.setCurrentMusic
  );
  return { action: { setIsPlay, setCurrentMusic } };
}
