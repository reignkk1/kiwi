import {
  audio,
  audioControllerStore,
  musicInfoStore,
  playListStore,
} from '../../store';

export function choiceRandomMusicPlay() {
  // playList music json 갖고 오는게 비동기로 처리해야함.
  const musicData = playListStore.music.data;

  const {setState: setMusicInfo} = musicInfoStore;

  const {title, imgNumber} =
    musicData[Math.floor(Math.random() * musicData.length)];

  setMusicInfo({title, img: `./assets/img/${imgNumber}.png`});

  audio.src = `./assets/mp3/${title}.mp3`;
}

export function choiceNextMusicPlay() {
  const musicData = playListStore.music.data;
  const {getState: getMusicInfo, setState: setMusicInfo} = musicInfoStore;
  const {getState: getAudioController, setState: setAudioController} =
    audioControllerStore;

  let currentMusicIndex = musicData.findIndex(
    ({title}) => getMusicInfo().title === title
  );

  if (currentMusicIndex === musicData.length - 1) {
    currentMusicIndex = -1;
  }

  const {title, imgNumber} = musicData[currentMusicIndex + 1];

  setMusicInfo({title, img: `./assets/img/${imgNumber}.png`});
  setAudioController({...getAudioController(), play: true});

  audio.src = `./assets/mp3/${title}.mp3`;
  audio.play();
}

export function choiceMusicPlay(title, imgNumber) {
  const {getState: getMusicInfo, setState: setMusicInfo} = musicInfoStore;
  const {getState: getAudioController, setState: setAudioController} =
    audioControllerStore;

  setMusicInfo({title, img: `./assets/img/${imgNumber}.png`});
  setAudioController({...getAudioController(), play: true});

  audio.src = `./assets/mp3/${title}.mp3`;
  audio.play();
}

// json 파일 가수, 제목 형태로 다시 만들면 해당 모듈은 필요없음
export function getMusicInfo(title) {
  const [singer, musicTitle] = title.split(' - ');
  return {singer, musicTitle};
}
