import {musicInfoStore, playListStore} from '../../../store';
import {playListButtonEvent} from '../events';

class ModalPlayList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState: getMusicInfo} = musicInfoStore;
    const {title: currentTitle} = getMusicInfo();

    this.innerHTML = `
          <ul>
              ${playListStore.music.data
                .map(
                  ({title, singer, imgNumber}) => `
              <li class='list-wrap'>
                  <div class='list-cover'>
                      <img class='list-img' src='./assets/img/${imgNumber}.png' />
                      ${currentTitle === title ? `<img class='music-bar' src='./assets/img/music-bar.gif' />` : ''}
                  </div>
                  <div>
                      <div class='list-title'>
                          <span style='${currentTitle === title ? 'color: #cd93c9' : ''}'>${title}</span>
                      </div>
                      <div class='list-singer'>
                          <span>${singer}</span>
                      </div>
                  </div>
              </li>
              `
                )
                .join('')}
              
          </ul>
      `;

    this.scrollIntoViewCurrentTitle(currentTitle);
    this.addEvents();
  }

  addEvents() {
    playListButtonEvent();
  }

  scrollIntoViewCurrentTitle(currentTitle) {
    this.querySelectorAll('.list-title span').forEach((title) => {
      if (title.innerText === currentTitle) {
        title.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    });
  }
}

export default ModalPlayList;
