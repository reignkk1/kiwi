import { resolveMusicId } from "./../utils";
import { useDrawerStore } from "../store/drawer";
import { useShallow } from "zustand/react/shallow";
import { useAlertStore } from "../store/shared";
import { useCurrentPlaylist } from "../store/drawer/useCurrentPlaylist";

export default function usePutInMusicDrawer(musicId?: number | string) {
  const id = resolveMusicId(musicId);

  const [playListIds, setPlayListIds] = useDrawerStore(
    useShallow((state) => [state.playListIds, state.setPlayListIds])
  );

  const currentPlaylist = useCurrentPlaylist((state) => state.currentPlaylist);

  const toggleFadeAlertMessage = useAlertStore(
    (state) => state.toggleFadeAlertMessage
  );

  const resolvedPlaylistIds = playListIds[currentPlaylist];

  const isIncluded = resolvedPlaylistIds.includes(id);

  const putInMusicDrawer = () => {
    const message = isIncluded
      ? "이미 담긴 곡 입니다."
      : "1곡을 음악서랍에 담았습니다.";

    toggleFadeAlertMessage(message);

    if (!isIncluded) {
      setPlayListIds({
        ...playListIds,
        [currentPlaylist]: [...resolvedPlaylistIds, id],
      });
    }
  };

  return putInMusicDrawer;
}
