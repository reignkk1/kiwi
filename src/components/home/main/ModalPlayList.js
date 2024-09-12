import {audioStore, modalPlayListStore, playListStore} from '../../../store';
import {playListEvent} from '../events';
import {getMusicInfo} from '../utils';

class ModalPlayList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = modalPlayListStore;
    const {getState: audioState} = audioStore;
    const audioTitle = audioState().title;

    if (getState().show) {
      this.innerHTML = `
      <div class='modal-playlist'>
          <ul>
              ${playListStore.music.data
                .map(
                  ({title, imgNumber}) => `
              <li class='list-wrap'>
                  <div>
                      <img class='list-img' src='./assets/img/${imgNumber}.png' />
                  </div>
                  <div>
                      <div class='list-title'>
                          <span style='${audioTitle === title ? 'color: #cd93c9' : ''}'>${getMusicInfo(title).musicTitle}</span>
                      </div>
                      <div class='list-singer'>
                          <span>${getMusicInfo(title).singer}</span>
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
    playListEvent();
  }
}

export default ModalPlayList;
