import { musicDrawerStorage } from "../../lib/localStorage";

export default function useMusicDrawerStorage() {
  const { get, set: setMusicDrawer } = musicDrawerStorage;
  const musicDrawer = get("musicDrawer");

  return { musicDrawer, setMusicDrawer };
}
