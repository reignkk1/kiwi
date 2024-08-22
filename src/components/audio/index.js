import state from '../../store';
import {
  hideAudioController,
  randomChoiceMusic,
  showAudioController,
  togglePlay,
} from './hooks';

const playList = await import('../../../playList.json', {
  with: {
    type: 'json',
  },
});

class AudioScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    randomChoiceMusic(playList);
    this.render();
  }

  render() {
    this.innerHTML = `
       <div class='music-screen'>
          <img class='music-img' src='${state.imgSrc}'/>
          <span class='music-title'>${state.audioTitle}</span>
          <audio-controller></audio-controller>
      </div>
      `;
    this.addEvents();
  }

  addEvents() {
    state.audio.addEventListener('ended', () => {
      randomChoiceMusic(playList);
      state.audio.play();
      this.render();
    });
    this.querySelector('.music-screen').addEventListener('mouseleave', () => {
      if (state.play) hideAudioController();
    });
    this.querySelector('.music-screen').addEventListener('mouseover', () => {
      if (state.play) showAudioController();
    });
    this.querySelector('.music-img').addEventListener('click', () => {
      togglePlay();
      this.render();
    });
  }
}

export default AudioScreen;
