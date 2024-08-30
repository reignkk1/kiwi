import Layout from './components/layout/index.js';
import Home from './components/home/index.js';
import Header from './components/home/Header.js';
import Main from './components/home/Main.js';
import Footer from './components/home/Footer.js';

import './styles/reset.css';
import './styles/layout.css';
import './styles/home.css';

customElements.define('layout-root', Layout);

customElements.define('home-content', Home);
customElements.define('home-header', Header);
customElements.define('home-main', Main);
customElements.define('home-footer', Footer);
