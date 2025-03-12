const audio = new Audio();

export const musicPlayer = {
  play: () => audio.play(),
  pause: () => audio.pause(),
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
