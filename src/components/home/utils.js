import {audio, audioStore, playListStore} from '../../store';

export function choiceRandomMusicPlay() {
  const musicData = playListStore.music.data;
  const {getState, setState} = audioStore;

  const {title, imgNumber} =
    musicData[Math.floor(Math.random() * musicData.length)];

  setState({
    ...getState(),
    title,
    img: `./assets/img/${imgNumber}.png`,
    play: true,
  });

  console.log(getState());

  audio.src = `./assets/mp3/${title}.mp3`;
  audio.play();
}

export function choiceNextMusicPlay() {
  const musicData = playListStore.music.data;
  const {getState, setState} = audioStore;

  let currentMusicIndex = musicData.findIndex(
    ({title}) => audioStore.title === title
  );

  if (currentMusicIndex === musicData.length - 1) {
    currentMusicIndex = -1;
  }

  const {title, imgNumber} = musicData[currentMusicIndex + 1];

  setState({
    ...getState(),
    title,
    img: `./assets/img/${imgNumber}.png`,
    play: true,
  });

  audio.src = `./assets/mp3/${title}.mp3`;
  audio.play();
}

export function choiceMusicPlay(title, imgNumber) {
  const {getState, setState} = audioStore;

  setState({
    ...getState(),
    title,
    img: `./assets/img/${imgNumber}.png`,
    play: true,
  });

  audio.src = `./assets/mp3/${title}.mp3`;
  audio.play();
}

// json 파일 가수, 제목 형태로 다시 만들면 해당 모듈은 필요없음
export function getMusicInfo(title) {
  const [singer, musicTitle] = title.split(' - ');
  return {singer, musicTitle};
}

export function getPlayButtonClassName() {
  const {getState} = audioStore;
  const {play} = getState();
  if (play) {
    return 'fas fa-pause';
  } else {
    return 'fas fa-play';
  }
}
