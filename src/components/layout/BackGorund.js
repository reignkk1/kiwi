import {musicInfoStore} from '../../store';

class BackGorund extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState: getMusicInfo} = musicInfoStore;
    const {backGroundColor} = getMusicInfo();
    this.innerHTML = `
        <div style='background-color:${backGroundColor}' class='background'></div>
    `;
  }
}

export default BackGorund;
