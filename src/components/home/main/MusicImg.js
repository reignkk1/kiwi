import {musicInfoStore} from '../../../store';

class MusicImg extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = musicInfoStore;
    const {imgSrc} = getState();

    this.innerHTML = `
            <div class='music-img'>
                <img src='${imgSrc}'/>
            </div>
            
            `;
  }
}

export default MusicImg;
