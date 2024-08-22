import {
  clearAllInput,
  disabledSubmitButton,
  getInputData,
  renderCommentList,
  toggleShowButtons,
} from './hooks';
import {fetchCreateComment} from '../../http';
import state from '../../store';

class Buttons extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class='buttons-container'>
            <button class='button-cancel'>취소</button>
            <button class='button-submit disabled' disabled>등록</button>
        </div>
    `;
    this.addEvents();
  }

  addEvents() {
    this.querySelector('.button-cancel').addEventListener('click', () => {
      toggleShowButtons(false);
      clearAllInput();
      disabledSubmitButton();
    });

    this.querySelector('.button-submit').addEventListener('click', () => {
      const {nickname, password, text} = getInputData();

      if (!nickname || !password) {
        return alert('아이디 또는 비밀번호를 입력해주세요.');
      } else {
        clearAllInput();
        this.createComment(nickname, password, text);
      }
    });
  }

  async createComment(nickname, password, text) {
    const data = await fetchCreateComment(nickname, password, text);

    state.comments.push({
      nickname: data.nickname,
      text: data.text,
      password: data.password,
      reqIp: data.reqIp,
    });

    renderCommentList();
  }
}

export default Buttons;
