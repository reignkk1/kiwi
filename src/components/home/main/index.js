import {musicInfoStore} from '../../../store';

class Main extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = musicInfoStore;
    const {img} = getState();

    this.innerHTML = `
            <main class='home-main'>
                <div class='music-img'>
                    <img src='${img}'/>
                </div>
                <play-list></play-list>
            </main>
          `;
  }
}

export default Main;
