import {
  modalPlayListStore,
  musicInfoStore,
  playListStore,
} from '../../../store';
import {playListButtonEvent} from '../events';

class ModalPlayList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState: getModalPlayList} = modalPlayListStore;
    const {getState: getMusicInfo} = musicInfoStore;

    const {title: currentTitle} = getMusicInfo();
    const {show} = getModalPlayList();

    if (show) {
      this.innerHTML = `
      <div class='modal-playlist'>
          <ul>
              ${playListStore.music.data
                .map(
                  ({title, singer, imgNumber}) => `
              <li class='list-wrap'>
                  <div>
                      <img class='list-img' src='./assets/img/${imgNumber}.png' />
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
      </div>
      `;
    } else {
      this.innerHTML = null;
    }

    this.addEvents();
  }

  addEvents() {
    playListButtonEvent();
  }
}

export default ModalPlayList;
