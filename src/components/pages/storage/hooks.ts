import { createAudioStore } from "./../../audio/store";

export function useMusicListStore() {
  const musicInfo = createAudioStore((state) => state.musicInfo);
  return { state: { musicInfo } };
}
