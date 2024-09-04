import {getMusicInfo} from '../utils';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header class='home-header'>
                <div class='header-left'>
                    <h1>${getMusicInfo().musicTitle}</h1>
                    <span>${getMusicInfo().singer}</span>
                </div>
                <div class='header-right'>
                    <button>
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <button>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </header>
        `;
  }
}

export default Header;
