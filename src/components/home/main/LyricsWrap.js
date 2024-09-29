import {currentLyricsPointStore, musicInfoStore} from '../../../store';

class LyricsWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState: getMusicInfo} = musicInfoStore;
    const {getState: getCurrentLyricsPoint} = currentLyricsPointStore;

    const {lyrics} = getMusicInfo();
    const {startTime: currentStartTime} = getCurrentLyricsPoint();

    this.innerHTML = `
             <div class='lyrics-wrap'>
                ${lyrics
                  .map(({text, startTime}) => {
                    return `<div id=${startTime} class='lyrics-text'>
                                <span style='${currentStartTime === startTime && 'color:white'}'>${text}</span>
                             </div>`;
                  })
                  .join('')}
             </div>
            `;
    this.scrollIntoViewCurrentTitle(currentStartTime);
  }

  scrollIntoViewCurrentTitle(startTime) {
    this.querySelectorAll('.lyrics-text').forEach((lyrics) => {
      if (lyrics.id == startTime) {
        lyrics.scrollIntoView({block: 'start'});
      }
    });
  }
}

export default LyricsWrap;
