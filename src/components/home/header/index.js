import {audioStore, musicTitleStore} from '../../../store';
import {getMusicInfo} from '../utils';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const {getState} = audioStore;
    const {title} = getState();
    if (getMusicInfo(title).musicTitle.length > 10) {
      musicTitleStore.animation = true;
      this.render();
      document
        .querySelectorAll('.title-track h1')
        .forEach((title) => (title.style.animationPlayState = 'running'));
    } else {
      musicTitleStore.animation = false;
      this.render();
    }
  }

  render() {
    const {getState} = audioStore;
    const {title} = getState();
    const {musicTitle, singer} = getMusicInfo(title);

    this.innerHTML = `
            <header class='home-header'>
                <div class='header-left'>
                    <div class='title-track'>
                      <h1>${musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>
                      ${musicTitleStore.animation ? `<h1>${musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>` : ``}
                    </div>
                    <span>${singer}</span>
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
    this.addEvents();
  }

  addEvents() {}
}

export default Header;
