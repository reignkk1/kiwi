import {audioEndEvent, audioLoadedDataEvent, timeUpdateEvent} from './events';
import {choiceRandomMusic} from './utils';

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    choiceRandomMusic();
  }

  render() {
    this.innerHTML = `
            <div class='screen'>
                <home-header></home-header>
                <home-main></home-main>
                <home-footer></home-footer>
            </div>
            `;
    this.addEvents();
  }

  addEvents() {
    audioLoadedDataEvent();
    audioEndEvent();
    timeUpdateEvent();
  }
}

export default Home;
