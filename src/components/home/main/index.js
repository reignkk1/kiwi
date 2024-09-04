import {audioStore} from '../../../store';

class Main extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <main class='home-main'>
                <div class='music-img'>
                    <img src='${audioStore.img}'/>
                </div>
            </main>
          `;
  }
}

export default Main;
