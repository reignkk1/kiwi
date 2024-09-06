import Layout from './components/layout';
import Home from './components/home';
import Header from './components/home/header';
import Main from './components/home/main';
import Footer from './components/home/footer';

import TimeLine from './components/home/footer/TimeLine.js';
import AudioController from './components/home/footer/AudioController.js';
import ModalMessage from './components/home/footer/ModalMessage.js';
import ModalPlayList from './components/home/main/ModalPlayList.js';

import './styles/reset.css';
import './styles/layout.css';
import './styles/home.css';

customElements.define('layout-root', Layout);
customElements.define('home-content', Home);

customElements.define('home-header', Header);

customElements.define('home-main', Main);
customElements.define('play-list', ModalPlayList);

customElements.define('home-footer', Footer);
customElements.define('time-line', TimeLine);
customElements.define('modal-message', ModalMessage);
customElements.define('audio-controller', AudioController);
