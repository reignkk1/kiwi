import {modalPlayListStore} from '../../../store';

class ModalPlayListWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState: getModalPlayList} = modalPlayListStore;
    const {show} = getModalPlayList();

    if (show) {
      this.innerHTML = `
        <div class='modal-playlist'>
            <play-list></play-list>    
        </div>
        `;
    } else {
      this.innerHTML = null;
    }
  }
}

export default ModalPlayListWrap;
