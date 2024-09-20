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
                <play-list-wrap></play-list-wrap>
            </main>
          `;
  }
}

export default Main;
