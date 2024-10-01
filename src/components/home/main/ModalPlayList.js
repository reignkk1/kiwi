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
                  ({title, singer, imgSrc}) => `
              <li class='list-wrap'>
                  <div class='list-cover'>
                      <img class='list-img' src=${imgSrc} />
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
        document
          .querySelector('.modal-playlist')
          .scrollTo({top: title.offsetTop - 150, behavior: 'smooth'});
      }
    });
  }
}

export default ModalPlayList;
