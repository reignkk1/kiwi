import {modalMessageStore} from '../../../store';

class ModalMessage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const {getState} = modalMessageStore;
    const {show, text} = getState();
    if (show) {
      this.innerHTML = `
            <div class='modal-message-box'>
                <span>${text}</span>
            </div>
        `;
    } else {
      this.innerHTML = '';
    }
  }
}

export default ModalMessage;
