import {audio} from '../../store';
import {choiceMusic, handleHistory} from '../home/utils';

class Layout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 첫 화면 렌더링 시 음악 랜덤으로 뽑고
    // 뽑은 음악 history에 넣기
    this.render();
    choiceMusic('random');
    handleHistory('push');

    // 노래 초기 볼륨 0.5 설정
    audio.volume = 0.5;
  }

  render() {
    this.innerHTML = `
        <div id='wrap'>
            <div id='root'>
              <div class='edge'></div>
              <back-ground></back-ground>
              <home-content></home-content>
            </div>
        </div>
    `;
  }
}

export default Layout;
