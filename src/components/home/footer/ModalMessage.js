import {modalMessageStore} from '../../../store';

class ModalMessage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (modalMessageStore.show) {
      this.innerHTML = `
            <div class='modal-message-box'>
                <span>${modalMessageStore.text}</span>
            </div>
        `;
    } else {
      this.innerHTML = '';
    }
  }
}

export default ModalMessage;
