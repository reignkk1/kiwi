import {
  audio,
  audioControllerStore,
  historyMusicStore,
  musicInfoStore,
  playListStore,
} from '../../store';

export function handleLocationIndex(action) {
  const {getState: getHistoryMusic, setState: setHistoryMusic} =
    historyMusicStore;

  const currentLocationIndex = getHistoryMusic().locationIndex;
  let newLocationIndex;

  switch (action) {
    case 'prev':
      if (currentLocationIndex === 0) {
        newLocationIndex = 0;
      } else {
        newLocationIndex = currentLocationIndex - 1;
      }
      break;
    case 'next':
      newLocationIndex = currentLocationIndex + 1;
      break;
  }

  setHistoryMusic({locationIndex: newLocationIndex});
}

export function handleHistory(action) {
  const {getState: getHistoryMusic, setState: setHistoryMusic} =
    historyMusicStore;
  const {getState: getMusicInfo} = musicInfoStore;

  const currentMusic = getMusicInfo();
  let newHistory = getHistoryMusic().history;

  if (action === 'push') {
    newHistory.push(currentMusic);
  } else if (action === 'unshift') {
    newHistory.unshift(currentMusic);
  }

  setHistoryMusic({history: newHistory});
}

export function choiceMusic(action) {
  const musicData = playListStore.music.data;
  const {getState: getMusicInfo, setState: setMusicInfo} = musicInfoStore;

  let newMusicInfo;
  let currentMusicIndex = musicData.findIndex(
    (music) => music.title === getMusicInfo().title
  );

  const createMusicInfo = (musicInfo) => {
    return {...musicInfo, slide: musicInfo.title.length > 10 ? true : false};
  };

  switch (action) {
    case 'random':
      newMusicInfo = createMusicInfo(
        musicData[Math.floor(Math.random() * musicData.length)]
      );
      break;
    case 'next':
      if (currentMusicIndex === musicData.length - 1) {
        currentMusicIndex = -1;
      }
      newMusicInfo = createMusicInfo(musicData[currentMusicIndex + 1]);
      break;
    case 'prev':
      if (currentMusicIndex === 0) {
        currentMusicIndex = musicData.length - 1;
      }
      newMusicInfo = createMusicInfo(musicData[currentMusicIndex - 1]);
      break;
  }

  audio.src = `./assets/mp3/${newMusicInfo.singer + ' - ' + newMusicInfo.title}.mp3`;
  setMusicInfo(newMusicInfo);
}

export function choiceSelectMusic(title, singer, imgSrc) {
  const {setState: setMusicInfo} = musicInfoStore;

  setMusicInfo({
    title,
    singer,
    imgSrc,
    slide: title.length > 10 ? true : false,
  });

  audio.src = `./assets/mp3/${singer + ' - ' + title}.mp3`;
}

export function handleAudio(action) {
  const {setState: setAudioController} = audioControllerStore;

  if (action === 'play') {
    setAudioController({play: true});
    audio.play();
  } else if (action === 'pause') {
    setAudioController({play: false});
    audio.pause();
  }
}
