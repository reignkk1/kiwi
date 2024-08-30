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
                <div class='music-img'>
                    <img src='./assets/img/2.png'/>
                </div>
            </main>
          `;
  }
}

export default Main;
