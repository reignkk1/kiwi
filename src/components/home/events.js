import {
  audio,
  audioControllerStore,
  modalMessageStore,
  modalPlayListStore,
  musicInfoStore,
} from '../../store';
import {
  choiceMusicPlay,
  choiceNextMusicPlay,
  choiceRandomMusicPlay,
} from './utils';

export function audioEndEvent() {
  const {getState} = audioControllerStore;
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
  const {getState, setState} = audioControllerStore;

  document.querySelector('.input-range').addEventListener('input', (e) => {
    audio.pause();
    audio.currentTime = e.target.value;
  });
  document.querySelector('.input-range').addEventListener('change', () => {
    audio.play();
    setState({play: true});
  });
}

export function buttonEvent() {
  const {getState, setState} = audioControllerStore;
  const {} = modalMessageStore;
  const {} = musicInfoStore;
  const {shuffle, play, loop} = getState();

  document.querySelector('.shuffle-button').addEventListener('click', () => {
    setState({...getState(), shuffle: !getState().shuffle});

    if (shuffle) {
      modalMessageStore.text = '셔플을 사용합니다.';
    } else {
      modalMessageStore.text = '셔플을 사용하지 않습니다.';
    }

    modalMessageStore.show = true;
    document.querySelector('modal-message').render();
  });
  document
    .querySelector('.toggle-play-button')
    .addEventListener('click', () => {
      if (play) {
        audio.pause();
        setState({...getState(), play: false});
      } else {
        audio.play();
        setState({...getState(), play: true});
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

      setState({play: true});

      modalMessageStore.show = false;
      // 전체 렌더링 할 필요가 있을까?
      document.querySelector('home-content').render();
    });

  document.querySelector('.redo-alt-button').addEventListener('click', () => {
    if (loop) {
      modalMessageStore.text = '반복을 사용하지 않습니다.';
    } else {
      modalMessageStore.text = '현재 음악을 반복합니다.';
    }

    modalMessageStore.show = true;
    setState({loop: !getState().loop});

    audio.loop = getState().loop;

    document.querySelector('modal-message').render();
  });

  document.querySelector('.volume-range').oninput = (e) => {
    audio.volume = e.target.value;
  };

  document.querySelector('.volume-button').addEventListener('click', () => {
    setState({muted: !getState().muted});

    // muted 로직 더 짜보기

    audio.muted = getState().muted;
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

// header, main 부분을 같은 컴포넌트로 묶어서 노래가 load 될때마다 해당 컴포넌트를 같이 렌더링 해야함.
// 현재 문제점은 노래 제목이 바뀔때 header부분을 렌더링 시키면 connectedCallback이 실행이 안되고 render 함수가 실행되어
// 애니메이션이 작동을 안함. 그래서 상위 컴포넌트를 만들어서 상위 컴포넌트를 렌더링 해줘야함. 그러면 connectedCallback이 실행됌

// playList data를 title, singer 따로 분류해서 json 형태로 작성하는게 좋아보임
// 현재 재생중인 곡에 따라서 playList scroll 위치를 변경
