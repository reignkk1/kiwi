class Layout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div id='wrap'>
            <div id='root'>
              <home-content></home-content>
            </div>
        </div>
    `;
  }
}

export default Layout;
