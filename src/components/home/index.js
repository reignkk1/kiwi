import {audioEndEvent, audioLoadedDataEvent, timeUpdateEvent} from './events';
import {choiceMusic, handleHistory} from './utils';

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    // 첫 화면 렌더링 시 음악 랜덤으로 뽑고
    // 뽑은 음악 history에 넣기
    choiceMusic('random');
    handleHistory('push');
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
