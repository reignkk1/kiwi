import {musicInfoStore} from '../../../store';

class MusicInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = musicInfoStore;
    const {title, singer} = getState();
    const slide = title.length > 10;

    this.innerHTML = `
        <div class='header-left'>
            <div class='title-track'>
                <h1 style='animation-play-state:${slide ? 'running' : 'pause'}'>${title} &nbsp;&nbsp;&nbsp;&nbsp;</h1>
                ${slide ? `<h1 style='animation-play-state:${slide ? 'running' : 'pause'}'>${title} &nbsp;&nbsp;&nbsp;&nbsp;</h1>` : ``}
            </div>
            <span class='singer'>${singer}</span>
        </div>
    `;
  }
}

export default MusicInfo;
