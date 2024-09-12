import {
  audio,
  audioStore,
  modalMessageStore,
  modalPlayListStore,
} from '../../store';
import {
  choiceMusicPlay,
  choiceNextMusicPlay,
  choiceRandomMusicPlay,
} from './utils';

export function audioEndEvent() {
  const {getState} = audioStore;
  const {shuffle} = getState();
  audio.addEventListener('ended', () => {
    // loop 일 경우 ended 이벤트는 실행이 안됌

    if (shuffle) {
      choiceRandomMusicPlay();
    } else {
      choiceNextMusicPlay();
    }

    modalMessageStore.show = false;

    document.querySelector('home-content').render();
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
  const {getState, setState} = audioStore;

  document.querySelector('.input-range').addEventListener('input', (e) => {
    audio.pause();
    audio.currentTime = e.target.value;
  });
  document.querySelector('.input-range').addEventListener('change', () => {
    audio.play();
    setState({...getState(), play: true});
    document.querySelector('audio-controller').render();
  });
}

export function buttonEvent() {
  const {getState, setState} = audioStore;
  const {shuffle, play, loop} = getState();
  document.querySelector('.shuffle-button').addEventListener('click', () => {
    shuffle = !shuffle;

    if (shuffle) {
      modalMessageStore.text = '셔플을 사용합니다.';
    } else {
      modalMessageStore.text = '셔플을 사용하지 않습니다.';
    }

    modalMessageStore.show = true;
    document.querySelector('modal-message').render();
    document.querySelector('audio-controller').render();
  });
  document
    .querySelector('.toggle-play-button')
    .addEventListener('click', () => {
      if (play) {
        audio.pause();
        setState({...getState(), play: false});
        document.querySelector('audio-controller').render();
      } else {
        audio.play();
        setState({...getState(), play: true});
        document.querySelector('audio-controller').render();
      }
    });

  document
    .querySelector('.step-forward-button')
    .addEventListener('click', () => {
      if (loop) {
        audio.currentTime = 0;
        audio.load();
        audio.play();
      } else if (shuffle) {
        choiceRandomMusicPlay();
      } else {
        choiceNextMusicPlay();
      }

      setState({...getState(), play: true});
      play = true;
      modalMessageStore.show = false;
      document.querySelector('home-content').render();
    });

  document.querySelector('.redo-alt-button').addEventListener('click', () => {
    if (loop) {
      modalMessageStore.text = '반복을 사용하지 않습니다.';
    } else {
      modalMessageStore.text = '현재 음악을 반복합니다.';
    }

    modalMessageStore.show = true;
    setState({...getState(), loop: !getState().loop});

    audio.loop = loop;

    document.querySelector('modal-message').render();
    document.querySelector('audio-controller').render();
  });

  document.querySelector('.volume-range').oninput = (e) => {
    audio.volume = e.target.value;
  };

  document.querySelector('.volume-button').addEventListener('click', () => {
    setState({...getState(), muted: !getState().muted});

    // muted 로직 더 짜보기

    audio.muted = muted;
    document.querySelector('audio-controller').render();
  });

  document
    .querySelector('.toggle-modal-playlist-button')
    .addEventListener('click', () => {
      const {setState, getState} = modalPlayListStore;
      setState({show: !getState().show});
    });
}

export function playListEvent() {
  document.querySelectorAll('.list-wrap').forEach((list) => {
    list.addEventListener('click', () => {
      const title = list.querySelector('.list-title span').innerText;
      const singer = list.querySelector('.list-singer span').innerText;
      const imgNumber = list
        .querySelector('.list-img')
        .src.slice(0, -4)
        .split('/')
        .pop();

      choiceMusicPlay(singer + ' - ' + title, imgNumber);
      document.querySelector('home-content').render();
    });
  });
}

// playList data를 title, singer 따로 분류해서 json 형태로 작성하는게 좋아보임
// 현재 재생중인 곡에 따라서 playList scroll 위치를 변경
