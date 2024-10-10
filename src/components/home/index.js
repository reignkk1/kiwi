import {audioEndEvent, audioLoadedDataEvent, timeUpdateEvent} from './events';

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class='screen'>
              <header class='home-header'>
                <music-info></music-info>
                <menu-buttons></menu-buttons>
              </header>
              <main class='home-main'>
                <music-img></music-img>
                <lyrics-wrap></lyrics-wrap>
                <play-list-wrap></play-list-wrap>
              </main>
              <footer class='home-footer'>
                <time-line></time-line>
                <modal-message></modal-message>
                <audio-controller></audio-controller>
              </footer>
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
