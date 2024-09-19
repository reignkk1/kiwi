import {
  audio,
  audioControllerStore,
  musicInfoStore,
  playListStore,
} from '../../store';

export function choiceRandomMusic() {
  const musicData = playListStore.music.data;
  const {setState: setMusicInfo} = musicInfoStore;
  const {title, singer, imgNumber} =
    musicData[Math.floor(Math.random() * musicData.length)];

  setMusicInfo({
    title,
    singer,
    imgSrc: `./assets/img/${imgNumber}.png`,
    slide: title.length > 10 ? true : false,
  });

  audio.src = `./assets/mp3/${singer + ' - ' + title}.mp3`;
}

export function choiceNextMusic() {
  const musicData = playListStore.music.data;
  const {getState: getMusicInfo, setState: setMusicInfo} = musicInfoStore;

  let currentMusicIndex = musicData.findIndex(
    ({title}) => getMusicInfo().title === title
  );

  if (currentMusicIndex === musicData.length - 1) {
    currentMusicIndex = -1;
  }

  const {title, imgNumber, singer} = musicData[currentMusicIndex + 1];

  setMusicInfo({
    title,
    singer,
    imgSrc: `./assets/img/${imgNumber}.png`,
    slide: title.length > 10 ? true : false,
  });

  audio.src = `./assets/mp3/${singer + ' - ' + title}.mp3`;
}

export function choiceMusic(title, singer, imgNumber) {
  const {setState: setMusicInfo} = musicInfoStore;

  setMusicInfo({
    title,
    singer,
    imgSrc: `./assets/img/${imgNumber}.png`,
    slide: title.length > 10 ? true : false,
  });

  audio.src = `./assets/mp3/${singer + ' - ' + title}.mp3`;
}

export function audioPlay() {
  const {setState: setAudioController} = audioControllerStore;
  setAudioController({play: true});
  audio.play();
}

export function audioPause() {
  const {setState: setAudioController} = audioControllerStore;
  setAudioController({play: false});
  audio.pause();
}
