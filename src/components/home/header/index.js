import {audioStore} from '../../../store';
import {getMusicInfo} from '../utils';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header class='home-header'>
                <div class='header-left'>
                    <div class='title-track'>
                      <h1>${getMusicInfo(audioStore.title).musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>
                      <h1>${getMusicInfo(audioStore.title).musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    </div>
                    <span>${getMusicInfo(audioStore.title).singer}</span>
                </div>
                <div class='header-right'>
                    <button>
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <button>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </header>
        `;
  }
}

export default Header;
