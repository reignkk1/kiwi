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
              <music-info></music-info>
              <menu-buttons></menu-buttons>
            </header>
        `;
  }
}

export default Header;
