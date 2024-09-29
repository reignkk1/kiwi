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
    this.innerHTML = `
            <div class='modal-message-box'>
                ${show ? `<span>${text}</span>` : ''}
            </div>
        `;
  }
}

export default ModalMessage;
