import {audio, audioControllerStore} from '../../../store';
import {buttonEvent} from '../events';

class AudioController extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = audioControllerStore;
    const {shuffle, loop, muted, play} = getState();

    this.innerHTML = `
          <div class='footer-bottom'>
            <div class='top-wrap'>
                <button class='shuffle-button'>
                    <i class="fas fa-random ${shuffle ? 'active' : null}"></i>
                </button>
                <button class='step-backward-button'>
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class='toggle-play-button'>
                    <i class='${play ? 'fas fa-pause' : 'fas fa-play'}'></i>
                </button>
                <button class='step-forward-button'>
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class='redo-alt-button'>
                    <i class="fas fa-redo-alt ${loop ? 'active' : null}"></i>
                </button>
            </div>
            <div class='bottom-wrap'>
              <div class='volume-wrap'>
                <button class='volume-button'>
                  <i class="fas ${muted ? 'fa-volume-mute' : 'fa-volume-down'}"></i>
                </button>
                <input class='volume-range' type='range' max='1' step='0.01' value='${audio.volume}'  />
              </div>  
              <div>
                <button class='toggle-modal-playlist-button'>
                  <i class="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
          `;
    this.addEvents();
  }

  addEvents() {
    buttonEvent();
  }
}

export default AudioController;
