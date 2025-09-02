import { useMusicDrawerStore } from ".";
import { usePlayListStore } from "./usePlayListStore";

export function usePlaylistStore() {
  return {
    category: "재생목록",
    playListIds: usePlayListStore((state) => state.playList),
    setPlaylistIds: usePlayListStore((state) => state.setPlayList),
  };
}

export function useDrawerStore() {
  return {
    category: "음악서랍",
    playListIds: useMusicDrawerStore((state) => state.musicDrawer),
    setPlaylistIds: useMusicDrawerStore((state) => state.setMusicDrawer),
  };
}
