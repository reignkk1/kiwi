import usePutInMusicDrawerStore from "./store/usePutInMusicDrawerStore";
import { resolveMusicId } from "./../utils";

export default function usePutInMusicDrawer(musicId?: number | string) {
  const id = resolveMusicId(musicId);

  const {
    state: { musicDrawer },
    action: { toggleFadeAlertMessage, setMusicDrawer },
  } = usePutInMusicDrawerStore();

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
