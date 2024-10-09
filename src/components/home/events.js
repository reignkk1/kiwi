import {
  audio,
  audioControllerStore,
  currentLyricsPointStore,
  historyMusicStore,
  modalMessageStore,
  modalPlayListStore,
  musicInfoStore,
} from '../../store';

import {
  choiceSelectMusic,
  handleHistory,
  handleLocationIndex,
  choiceMusic,
  handleAudio,
} from './utils';

export function audioEndEvent() {
  audio.addEventListener('ended', () => {
    const {getState: getAudioController} = audioControllerStore;
    const {setState: setModalMessage} = modalMessageStore;
    const {shuffle} = getAudioController();

    if (shuffle) {
      const {getState: getHistoryMusic} = historyMusicStore;

      // 노래 히스토리, 현재 위치 인덱스, 현재 음악 정보, 현재 위치 인덱스에서 다음곡
      const history = getHistoryMusic().history;
      const locationIndex = getHistoryMusic().locationIndex;
      const historyNextMusic = history[locationIndex + 1];

      // 만약 다음곡이 없다면
      if (!historyNextMusic) {
        choiceMusic('random');
        handleLocationIndex('next');
        handleHistory('push');
      } else {
        const {title, singer, imgSrc, backGroundColor} = historyNextMusic;
        console.log(title, singer, imgSrc, backGroundColor);
        choiceSelectMusic(title, singer, imgSrc, backGroundColor);
        handleLocationIndex('next');
      }
    } else {
      choiceMusic('next');
    }

    setModalMessage({show: false});
    handleAudio('play');
  });
}

export function audioLoadedDataEvent() {
  audio.onloadeddata = () => {
    const audioDuration = audio.duration;

    document.querySelector('.input-range').value = 0;
    document.querySelector('.input-range').min = 0;
    document.querySelector('.input-range').max = audioDuration;

    let minute = Math.floor(audioDuration / 60);
    let second = Math.ceil(audioDuration % 60);

    if (second < 10) second = `0${second}`;
    document.querySelector('.end-time').innerText = `${minute}:${second}`;
  };
}

export function timeUpdateEvent() {
  audio.addEventListener('timeupdate', () => {
    const {setState: setCurrentLyricsPoint} = currentLyricsPointStore;
    const audioCurrentTime = audio.currentTime;

    let minute = Math.floor(audioCurrentTime / 60);
    let second = Math.floor(audioCurrentTime % 60);

    if (second < 10) second = `0${second}`;

    document.querySelector('.input-range').value = audioCurrentTime;
    document.querySelector('.current-time').innerText = `${minute}:${second}`;

    const {getState: getMusicInfo} = musicInfoStore;
    const {lyrics} = getMusicInfo();
    const currentLyricsPoint = lyrics.find(
      ({startTime, endTime}) =>
        startTime <= Math.floor(audioCurrentTime) &&
        Math.floor(audioCurrentTime) <= endTime
    );

    if (currentLyricsPoint) {
      setCurrentLyricsPoint({
        text: currentLyricsPoint.text,
        startTime: currentLyricsPoint.startTime,
        endTime: currentLyricsPoint.endTime,
      });
    }
  });
}

export function inputChangeEvent() {
  document.querySelector('.input-range').addEventListener('input', (e) => {
    handleAudio('pause');
    audio.currentTime = e.target.value;
  });
  document.querySelector('.input-range').addEventListener('change', () => {
    handleAudio('play');
  });
}

export function audioControllerButtonEvent() {
  const {getState: getAudioController, setState: setAudioController} =
    audioControllerStore;
  const {setState: setModalMessage} = modalMessageStore;

  document.querySelector('.shuffle-button').addEventListener('click', () => {
    setAudioController({shuffle: !getAudioController().shuffle});
    setModalMessage({
      show: true,
      text: getAudioController().shuffle
        ? '셔플을 사용합니다.'
        : '셔플을 사용하지 않습니다.',
    });
  });
  document
    .querySelector('.toggle-play-button')
    .addEventListener('click', () => {
      const {play} = getAudioController();
      if (play) {
        handleAudio('pause');
      } else {
        handleAudio('play');
      }
    });

  document
    .querySelector('.step-forward-button')
    .addEventListener('click', () => {
      const {loop, shuffle} = getAudioController();
      if (loop) {
        audio.currentTime = 0;
      } else if (shuffle) {
        const {getState: getHistoryMusic} = historyMusicStore;

        // 노래 히스토리, 현재 위치 인덱스, 현재 음악 정보, 현재 위치 인덱스에서 다음곡
        const history = getHistoryMusic().history;
        const locationIndex = getHistoryMusic().locationIndex;
        const historyNextMusic = history[locationIndex + 1];

        // 만약 다음곡이 없다면
        if (!historyNextMusic) {
          choiceMusic('random');
          handleLocationIndex('next');
          handleHistory('push');
        } else {
          const {title, singer, imgSrc, backGroundColor} = historyNextMusic;
          console.log(title, singer, imgSrc, backGroundColor);
          choiceSelectMusic(title, singer, imgSrc, backGroundColor);
          handleLocationIndex('next');
        }
      } else {
        choiceMusic('next');
      }

      handleAudio('play');
    });

  document
    .querySelector('.step-backward-button')
    .addEventListener('click', () => {
      const {loop, shuffle} = getAudioController();
      if (loop) {
        audio.currentTime = 0;
      } else if (shuffle) {
        if (audio.currentTime > 3) {
          audio.currentTime = 0;
        } else {
          const {getState: getHistoryMusic} = historyMusicStore;

          // 노래 히스토리, 현재 위치 인덱스, 현재 음악 정보, 현재 위치 인덱스에서 다음곡
          const history = getHistoryMusic().history;
          const locationIndex = getHistoryMusic().locationIndex;
          const historyPrevMusic = history[locationIndex - 1];

          // 만약 이전곡이 없다면
          if (!historyPrevMusic) {
            choiceMusic('random');
            handleLocationIndex('prev');
            handleHistory('unshift');
          } else {
            const {title, singer, imgSrc, backGroundColor} = historyPrevMusic;
            choiceSelectMusic(title, singer, imgSrc, backGroundColor);
            handleLocationIndex('prev');
          }
        }
      } else {
        if (audio.currentTime > 3) {
          audio.currentTime = 0;
        } else {
          choiceMusic('prev');
        }
      }

      handleAudio('play');
    });

  document.querySelector('.redo-alt-button').addEventListener('click', () => {
    setAudioController({loop: !getAudioController().loop});
    setModalMessage({
      show: true,
      text: getAudioController().loop
        ? '현재 음악을 반복합니다.'
        : '반복을 사용하지 않습니다.',
    });

    audio.loop = getAudioController().loop;
  });

  document.querySelector('.volume-range').oninput = (e) => {
    audio.volume = e.target.value;
  };

  document.querySelector('.volume-button').addEventListener('click', () => {
    setAudioController({muted: !getAudioController().muted});
    audio.muted = getAudioController().muted;
  });

  document
    .querySelector('.toggle-modal-playlist-button')
    .addEventListener('click', () => {
      const {setState: setModalPlayList, getState: getModalPlayList} =
        modalPlayListStore;
      setModalPlayList({show: !getModalPlayList().show});
    });
}

export function playListButtonEvent() {
  document.querySelectorAll('.list-wrap').forEach((list) => {
    list.addEventListener('click', () => {
      const title = list.querySelector('.list-title span').innerText;

      choiceSelectMusic(title);
      handleAudio('play');
    });
  });
}

export function chevronDownButtonEvent() {
  document.querySelector('.fa-chevron-down').addEventListener('click', () => {
    const {setState: setModalPlayList} = modalPlayListStore;
    setModalPlayList({show: false});
  });
}

// 볼륨바, 재생바 디자인 어떻게 할지 ...
// events 모듈들 리팩토링 하기 => 가독성
// 가사가 바뀔때마다 재렌더링이 왜 4번 일어날까?
// CSS 반응형 손보기 => height 높이에 따라서 zoom down 하기
