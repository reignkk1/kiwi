import {audioStore, playListStore} from '../../store';

export function choiceRandomMusicPlay() {
  const musicData = playListStore.music.data;
  const {title, imgNumber} =
    musicData[Math.floor(Math.random() * musicData.length)];

  audioStore.title = title;
  audioStore.img = `./assets/img/${imgNumber}.png`;
  audioStore.audio.src = `./assets/mp3/${title}.mp3`;

  audioStore.play = true;
  audioStore.audio.play();
}

export function choiceNextMusicPlay() {
  const musicData = playListStore.music.data;
  let currentMusicIndex = musicData.findIndex(
    ({title}) => audioStore.title === title
  );

  if (currentMusicIndex === musicData.length - 1) {
    currentMusicIndex = -1;
  }

  const {title, imgNumber} = musicData[currentMusicIndex + 1];

  audioStore.title = title;
  audioStore.img = `./assets/img/${imgNumber}.png`;
  audioStore.audio.src = `./assets/mp3/${title}.mp3`;

  audioStore.play = true;
  audioStore.audio.play();
}

export function choiceMusicPlay(title, imgNumber) {
  audioStore.title = title;
  audioStore.img = `./assets/img/${imgNumber}.png`;
  audioStore.audio.src = `./assets/mp3/${title}.mp3`;

  audioStore.play = true;
  audioStore.audio.play();
}

export function getMusicInfo(title) {
  const [singer, musicTitle] = title.split(' - ');
  return {singer, musicTitle};
}

export function getPlayButtonClassName() {
  if (audioStore.play) {
    return 'fas fa-pause';
  } else {
    return 'fas fa-play';
  }
}
