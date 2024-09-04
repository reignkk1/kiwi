import {audioStore} from '../../store';

const playList = await import('../../../playList.json', {
  with: {type: 'json'},
});

export function choiceRandomMusic() {
  const musicData = playList.data;
  const {title, imgNumber} =
    musicData[Math.floor(Math.random() * musicData.length)];

  audioStore.title = title;
  audioStore.img = `./assets/img/${imgNumber}.png`;
  audioStore.audio.src = `./assets/mp3/${title}.mp3`;
}

export function choiceNextMusic() {
  const musicData = playList.data;
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
}

export function getMusicInfo() {
  const [singer, musicTitle] = audioStore.title.split(' - ');
  return {singer, musicTitle};
}

export function getPlayButtonClassName() {
  if (audioStore.play) {
    return 'fas fa-pause';
  } else {
    return 'fas fa-play';
  }
}
