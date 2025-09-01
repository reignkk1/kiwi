import { useMusicDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";

export function usePlaylistDispatcher() {
  return {
    category: "재생목록",
    playListIds: usePlayListStore((state) => state.playList),
    setPlaylistIds: usePlayListStore((state) => state.setPlayList),
  };
}

export function useDrawerDispatcher() {
  return {
    category: "음악서랍",
    playListIds: useMusicDrawerStore((state) => state.musicDrawer),
    setPlaylistIds: useMusicDrawerStore((state) => state.setMusicDrawer),
  };
}
