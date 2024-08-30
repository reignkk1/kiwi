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
                    <div class='footer-top'>
                        <div class='input-range'>
                            <input type='range'/>
                        </div>
                        <div class='time-line'>
                            <span>0:56</span>
                            <span>3:10</span>
                        </div>
                    </div>
                    <div class='footer-bottom'>
                        <button>
                            <i class="fas fa-random"></i>
                        </button>
                        <button>
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button>
                            <i class="fas fa-play"></i>
                        </button>
                        <button>
                            <i class="fas fa-step-forward"></i>
                        </button>
                        <button>
                            <i class="fas fa-redo-alt"></i>
                        </button>
                    </div>
                </footer>
            `;
  }
}

export default Footer;
