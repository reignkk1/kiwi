class Main extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <main class='home-main'>
                <music-img></music-img>
                <play-list></play-list>
            </main>
          `;
  }
}

export default Main;
