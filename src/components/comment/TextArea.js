import {
  activeSubmitButton,
  disabledSubmitButton,
  toggleShowButtons,
} from '../../hooks';

class TextArea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class='textarea-container'>
                <textarea class='textarea' placeholder='댓글 추가..' rows='1'></textarea>
            </div>
        `;
    this.addEvents();
  }

  addEvents() {
    this.querySelector('.textarea').oninput = (e) => {
      const text = e.target.value;
      if (text === '') {
        disabledSubmitButton();
      } else {
        activeSubmitButton();
      }
    };

    this.querySelector('.textarea').addEventListener('focus', () => {
      toggleShowButtons(true);
    });
  }
}

export default TextArea;
