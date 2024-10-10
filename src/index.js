import Layout from './components/layout';
import BackGorund from './components/layout/BackGorund.js';
import Home from './components/home';

import MusicInfo from './components/home/header/MusicInfo.js';
import MenuButtons from './components/home/header/MenuButtons.js';

import MusicImg from './components/home/main/MusicImg.js';
import LyricsWrap from './components/home/main/LyricsWrap.js';
import ModalPlayListWrap from './components/home/main/ModalPlayListWrap.js';
import ModalPlayList from './components/home/main/ModalPlayList.js';

import TimeLine from './components/home/footer/TimeLine.js';
import ModalMessage from './components/home/footer/ModalMessage.js';
import AudioController from './components/home/footer/AudioController.js';

import './styles/home/header.css';
import './styles/home/main.css';
import './styles/home/footer.css';

import './styles/reset.css';
import './styles/layout.css';

customElements.define('layout-root', Layout);
customElements.define('back-ground', BackGorund);
customElements.define('home-content', Home);

customElements.define('music-info', MusicInfo);
customElements.define('menu-buttons', MenuButtons);

customElements.define('music-img', MusicImg);
customElements.define('lyrics-wrap', LyricsWrap);
customElements.define('play-list-wrap', ModalPlayListWrap);
customElements.define('play-list', ModalPlayList);

customElements.define('time-line', TimeLine);
customElements.define('modal-message', ModalMessage);
customElements.define('audio-controller', AudioController);

// 모바일 환경에서 사용자의 화면 높이값 설정
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
