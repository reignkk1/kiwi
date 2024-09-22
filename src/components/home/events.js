import {
  audio,
  audioControllerStore,
  historyMusicStore,
  modalMessageStore,
  modalPlayListStore,
  musicInfoStore,
} from '../../store';
import {
  audioPause,
  audioPlay,
  choiceMusic,
  choiceNextMusic,
  choiceRandomMusic,
} from './utils';

export function audioEndEvent() {
  audio.addEventListener('ended', () => {
    const {getState: getAudioController} = audioControllerStore;
    const {setState: setModalMessage} = modalMessageStore;
    const {shuffle} = getAudioController();

    if (shuffle) {
      choiceRandomMusic();
    } else {
      choiceNextMusic();
    }

    setModalMessage({show: false});
    audioPlay();
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
    const audioCurrentTime = audio.currentTime;

    let minute = Math.floor(audioCurrentTime / 60);
    let second = Math.floor(audioCurrentTime % 60);

    if (second < 10) second = `0${second}`;

    document.querySelector('.input-range').value = audioCurrentTime;
    document.querySelector('.current-time').innerText = `${minute}:${second}`;
  });
}

export function inputChangeEvent() {
  document.querySelector('.input-range').addEventListener('input', (e) => {
    audioPause();
    audio.currentTime = e.target.value;
  });
  document.querySelector('.input-range').addEventListener('change', () => {
    audioPlay();
  });
}

export function buttonEvent() {
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
        audioPause();
      } else {
        audioPlay();
      }
    });

  document
    .querySelector('.step-forward-button')
    .addEventListener('click', () => {
      const {loop, shuffle} = getAudioController();
      if (loop) {
        audio.currentTime = 0;
      } else if (shuffle) {
        const {getState: getHistoryMusic, setState: setHistoryMusic} =
          historyMusicStore;
        const {getState: getMusicInfo} = musicInfoStore;

        // 노래 히스토리, 현재 위치 인덱스, 현재 음악 정보, 현재 위치 인덱스에서 다음곡
        const history = getHistoryMusic().history;
        const locationIndex = getHistoryMusic().locationIndex;
        const musicInfo = getMusicInfo();
        const historyNextMusic = history[locationIndex + 1];

        // 만약 다음곡이 없다면
        if (!historyNextMusic) {
          let newLocationIndex = locationIndex;
          // 현재 곡의 정보를 히스토리에 추가
          // 현재 위치 인덱스를 +1 하여 앞으로 이동

          // 로직 다시 짜기

          if (history[0]) {
            newLocationIndex++;
          }

          history.push(musicInfo);
          setHistoryMusic({locationIndex: newLocationIndex, history});
          console.log(getHistoryMusic());
          choiceRandomMusic();
        } else {
          const {title, singer, imgNumber} = historyNextMusic;
          choiceMusic(title, singer, imgNumber);
        }
      } else {
        choiceNextMusic();
      }

      audioPlay();
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
      const singer = list.querySelector('.list-singer span').innerText;
      const imgNumber = list
        .querySelector('.list-img')
        .src.slice(0, -4)
        .split('/')
        .pop();

      choiceMusic(title, singer, imgNumber);
      audioPlay();
    });
  });
}

// 볼륨바 디자인 어떻게 할지 ...
// 노래 가사 넣기
// back step 버튼 이벤트 만들기 => playList history

// 현재 위치 index를 변수로 할당
// 페이지 처음 로드 시 history[]에 현재 곡 push 그리고 현재 위치 index = 0
// next step 버튼 눌렀을 때 현재 위치 index + 1이 존재 하지 않으면
// 랜덤 재생 한 후 해당 곡을 history[]에 push 그리고 현재 위치 index 업뎃
// back step 버튼 눌렀을 때 현재 위치 index - 1에 곡이 존재 하면 해당 곡을 실행
// 만약 곡이 존재 하지 않으면 랜덤 재생 한 곡을 history[]배열 앞에 unshift

// 셔플 ON(랜덤재생) 일 때 backstep 버튼 누를 시
// 현재 노래 재생 시간이 2초가 넘어 갔을 때 back step 버튼 누르면 현재 노래 반복 재생!
// 현재 노래 재생 시간이 2초 미만일 때 back step 버튼 누르면 이전 곡 재생!
