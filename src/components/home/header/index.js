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
                    <h1>${getMusicInfo(audioStore.title).musicTitle}</h1>
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
