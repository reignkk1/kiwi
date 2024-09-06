import {audioStore, modalMessageStore} from '../../store';
import {
  choiceMusicPlay,
  choiceNextMusicPlay,
  choiceRandomMusicPlay,
} from './utils';

export function audioEndEvent() {
  audioStore.audio.addEventListener('ended', () => {
    // loop 일 경우 ended 이벤트는 실행이 안됌

    if (audioStore.shuffle) {
      choiceRandomMusicPlay();
    } else {
      choiceNextMusicPlay();
    }

    modalMessageStore.show = false;

    document.querySelector('home-content').render();
  });
}

export function audioLoadedDataEvent() {
  audioStore.audio.onloadeddata = () => {
    const audioDuration = audioStore.audio.duration;

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
  audioStore.audio.addEventListener('timeupdate', () => {
    const audioCurrentTime = audioStore.audio.currentTime;

    let minute = Math.floor(audioCurrentTime / 60);
    let second = Math.floor(audioCurrentTime % 60);

    if (second < 10) second = `0${second}`;

    document.querySelector('.input-range').value = audioCurrentTime;
    document.querySelector('.current-time').innerText = `${minute}:${second}`;
  });
}

export function inputChangeEvent() {
  // input-range를 움직였을 때 노래가 안 멈춤

  document.querySelector('.input-range').addEventListener('input', (e) => {
    audioStore.audio.pause();
    audioStore.audio.currentTime = e.target.value;
  });
  document.querySelector('.input-range').addEventListener('change', () => {
    audioStore.audio.play();
    audioStore.play = true;
    document.querySelector('audio-controller').render();
  });
}

export function buttonEvent() {
  document.querySelector('.shuffle-button').addEventListener('click', () => {
    audioStore.shuffle = !audioStore.shuffle;

    if (audioStore.shuffle) {
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
      if (audioStore.play) {
        audioStore.audio.pause();
        audioStore.play = false;
        document.querySelector('audio-controller').render();
      } else {
        audioStore.audio.play();
        audioStore.play = true;
        document.querySelector('audio-controller').render();
      }
    });

  document
    .querySelector('.step-forward-button')
    .addEventListener('click', () => {
      if (audioStore.loop) {
        audioStore.audio.currentTime = 0;
        audioStore.audio.load();
      } else if (audioStore.shuffle) {
        choiceRandomMusicPlay();
      } else {
        choiceNextMusicPlay();
      }

      audioStore.play = true;
      modalMessageStore.show = false;
      document.querySelector('home-content').render();
    });

  document.querySelector('.redo-alt-button').addEventListener('click', () => {
    if (audioStore.loop) {
      modalMessageStore.text = '반복을 사용하지 않습니다.';
    } else {
      modalMessageStore.text = '현재 음악을 반복합니다.';
    }

    modalMessageStore.show = true;
    audioStore.loop = !audioStore.loop;
    audioStore.audio.loop = audioStore.loop;

    document.querySelector('modal-message').render();
    document.querySelector('audio-controller').render();
  });

  document.querySelector('.volume-range').oninput = (e) => {
    audioStore.audio.volume = e.target.value;
  };

  document.querySelector('.volume-button').addEventListener('click', () => {
    audioStore.muted = !audioStore.muted;

    // muted 로직 더 짜보기

    audioStore.audio.muted = audioStore.muted;
    document.querySelector('audio-controller').render();
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
// 첫렌더링 시 음량 초기값 0.5로 변경
// playList Scroll 스타일 변경
// playList button toggle on/off 상태관리
// 제목 길어지면 옆으로 애니메이션 슬라이드
