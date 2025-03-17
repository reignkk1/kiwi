import { selectRandomWithinArray } from "../utils";
import { musicDrawerStorage } from "./localStorage";
import { data } from "../musicData.json";

const audio = new Audio();

const { get: getMusicDrawerStorage } = musicDrawerStorage;
const musicDrawer = getMusicDrawerStorage("musicDrawer");

export const musicPlayer = {
  play: () => audio.play(),
  pause: () => audio.pause(),
  shuffle: (state: "on" | "off") => {
    if (state === "on") {
      const selectedMusic = data.filter(
        (music) => music.id === selectRandomWithinArray(musicDrawer)
      )[0];

      const nextMusicSrc = `./mp3/${selectedMusic.singer} - ${selectedMusic.title}.mp3`;
    }
  },
  get currentTime() {
    return audio.currentTime;
  },
  get duration() {
    return audio.duration;
  },
  get src() {
    return audio.src;
  },
  set src(newSrc) {
    audio.src = newSrc;
  },
  set ontimeupdate(event: () => void) {
    audio.ontimeupdate = event;
  },
  set currentTime(time) {
    audio.currentTime = time;
  },
};
