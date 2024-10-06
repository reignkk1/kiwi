import Layout from './components/layout';
import BackGorund from './components/layout/BackGorund.js';
import Home from './components/home';

import Header from './components/home/header';
import MusicInfo from './components/home/header/MusicInfo.js';
import MenuButtons from './components/home/header/MenuButtons.js';

import Main from './components/home/main';
import MusicImg from './components/home/main/MusicImg.js';
import LyricsWrap from './components/home/main/LyricsWrap.js';
import ModalPlayListWrap from './components/home/main/ModalPlayListWrap.js';
import ModalPlayList from './components/home/main/ModalPlayList.js';

import Footer from './components/home/footer';
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

customElements.define('home-header', Header);
customElements.define('music-info', MusicInfo);
customElements.define('menu-buttons', MenuButtons);

customElements.define('home-main', Main);
customElements.define('music-img', MusicImg);
customElements.define('lyrics-wrap', LyricsWrap);
customElements.define('play-list-wrap', ModalPlayListWrap);
customElements.define('play-list', ModalPlayList);

customElements.define('home-footer', Footer);
customElements.define('time-line', TimeLine);
customElements.define('modal-message', ModalMessage);
customElements.define('audio-controller', AudioController);

let vh = window.innerHeight * 0.01;
console.log(window.innerWidth, window.innerHeight);
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
