class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <footer class='home-footer'>
              <time-line></time-line>
              <modal-message></modal-message>
              <audio-controller></audio-controller>
          </footer>
            `;
  }
}

export default Footer;
