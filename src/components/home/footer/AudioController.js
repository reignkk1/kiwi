import {audioStore} from '../../../store';
import {buttonEvent} from '../events';
import {getPlayButtonClassName} from '../utils';

class AudioController extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class='footer-bottom'>
              <button class='shuffle-button'>
                  <i class="fas fa-random ${audioStore.shuffle ? 'active' : null}"></i>
              </button>
              <button class='step-backward-button'>
                  <i class="fas fa-step-backward"></i>
              </button>
              <button class='toggle-play-button'>
                  <i class='${getPlayButtonClassName()}'></i>
              </button>
              <button class='step-forward-button'>
                  <i class="fas fa-step-forward"></i>
              </button>
              <button class='redo-alt-button'>
                  <i class="fas fa-redo-alt ${audioStore.loop ? 'active' : null}"></i>
              </button>
          </div>
          `;
    this.addEvents();
  }

  addEvents() {
    buttonEvent();
  }
}

export default AudioController;
