import {audioStore, modalMessageStore} from '../../store';
import {choiceNextMusic, choiceRandomMusic} from './utils';

export function audioEndEvent() {
  audioStore.audio.addEventListener('ended', () => {
    // loop 일 경우 ended 이벤트는 실행이 안됌

    if (audioStore.shuffle) {
      choiceRandomMusic();
    } else {
      choiceNextMusic();
    }
    audioStore.audio.oncanplaythrough = () => audioStore.audio.play();
    audioStore.play = true;
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
        choiceRandomMusic();
      } else {
        choiceNextMusic();
      }

      audioStore.audio.play();
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
}
