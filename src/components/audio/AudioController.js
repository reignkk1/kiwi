import {getPlayIcon, getVolumeIcon, toggleMuted, togglePlay} from './hooks';
import state from '../../store';

class AudioController extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class='audio-controller'>
              <div class='left-controls'>
                  <button class='play-button'>
                      <i class='${getPlayIcon(state.play)}'></i>    
                  </button>
                  <button class='volume-button'>
                      <i class='${getVolumeIcon(state.muted)}'></i>                 
                  </button>
                  <span>
                      <input class='volume-range' type='range' min='0' max='1' step='0.1' value='${
                        state.audio.volume
                      }'/>
                  </span>
              </div>
            </div>
        `;
    this.addEvents();
  }
  addEvents() {
    this.querySelector('.play-button').addEventListener('click', () => {
      togglePlay();
      this.render();
    });
    this.querySelector('.volume-button').addEventListener('click', () => {
      toggleMuted();
      this.render();
    });
    this.querySelector('.volume-range').oninput = (e) => {
      state.audio.volume = e.target.value;

      if (state.audio.volume === 0) {
        state.muted = true;
      } else {
        state.muted = false;
      }
      this.querySelector('.volume-icon').className = getVolumeIcon();
    };
  }
}

export default AudioController;
