import {
  audio,
  audioControllerStore,
  modalMessageStore,
  modalPlayListStore,
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
        choiceRandomMusic();
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

// 현재 재생중인 곡에 따라서 playList scroll 위치를 변경
// 재생중인 곡은 이미지에 재생 표시하기 제목 색깔 다시 선정
// 볼륨바 디자인 어떻게 할지 ...
// 노래 가사 넣기
// back step 버튼 이벤트 만들기 => playList history
