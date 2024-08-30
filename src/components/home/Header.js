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
                    <h1>참 다행이야</h1>
                    <span>아일</span>
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
