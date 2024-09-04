import {audioEndEvent, audioLoadedDataEvent, timeUpdateEvent} from './events';

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    // audio 관련 events 최초로 딱 1번만 실행
    audioLoadedDataEvent();
    audioEndEvent();
    timeUpdateEvent();
  }

  render() {
    this.innerHTML = `
            <div class='screen'>
                <home-header></home-header>
                <home-main></home-main>
                <home-footer></home-footer>
            </div>
            `;
  }
}

export default Home;
