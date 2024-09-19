import {musicInfoStore, musicTitleStore} from '../../../store';
import {getMusicInfo} from '../utils';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const {getState, setState} = musicInfoStore;
    const {title} = getState();

    if (getMusicInfo(title).musicTitle.length > 10) {
      setState({slide: true});
    } else {
      setState({slide: false});
    }
  }

  render() {
    const {getState} = musicInfoStore;
    const {title} = getState();
    const {musicTitle, singer} = getMusicInfo(title);

    this.innerHTML = `
            <header class='home-header'>
                <div class='header-left'>
                    <div class='title-track'>
                      <h1 style='animation-play-state:${getState().slide ? 'running' : 'pause'}'>${musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>
                      ${getState().slide ? `<h1 style='animation-play-state:${getState().slide ? 'running' : 'pause'}'>${musicTitle} &nbsp;&nbsp;&nbsp;&nbsp;</h1>` : ``}
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
