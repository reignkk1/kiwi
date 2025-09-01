import { useMusicDrawerStore } from "../store/drawer";
import { usePlayListStore } from "../store/drawer/usePlayListStore";

export const playListDispatcher = {
  category: "재생목록",
  playListIds: usePlayListStore((state) => state.playList),
  setPlaylistIds: usePlayListStore((state) => state.setPlayList),
};

export const drawerDispatcher = {
  category: "음악서랍",
  playListIds: useMusicDrawerStore((state) => state.musicDrawer),
  setPlaylistIds: useMusicDrawerStore((state) => state.setMusicDrawer),
};
