import { resolveMusicId } from "./../utils";
import { useMusicDrawerStore } from "../store/storage";
import { useShallow } from "zustand/react/shallow";
import { useAlertStore } from "../store/shared";

export default function usePutInMusicDrawer(musicId?: number | string) {
  const id = resolveMusicId(musicId);

  const [musicDrawer, setMusicDrawer] = useMusicDrawerStore(
    useShallow((state) => [state.musicDrawer, state.setMusicDrawer])
  );
  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  const isIncluded = musicDrawer.includes(id);

  const putInMusicDrawer = () => {
    const message = isIncluded
      ? "이미 담긴 곡 입니다."
      : "1곡을 음악서랍에 담았습니다.";

    toggleFadeAlertMessage(message);

    if (!isIncluded) {
      setMusicDrawer([...musicDrawer, id]);
    }
  };

  return putInMusicDrawer;
}
