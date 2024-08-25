import {fetchGetComments} from '../../http';
import state from '../../store';
import {createListHooks} from './hooks';

class CommentList extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const data = await fetchGetComments();
    state.comments = data;
    this.render();
  }

  render() {
    this.innerHTML = `
            <ul class='comment-list'>
                ${state.comments
                  .map(({id, nickname, text, reqIp}) => {
                    return `
                      <li id=${id}>
                          <div>
                              <span>@${nickname} (${reqIp})</span>
                              <p>${text}</p>
                          </div>
                          <button class='comment-modal-button'>
                              <i class="fas fa-ellipsis-v"></i>
                          </button>
                          <div class='comment-modal'>
                              <button class='delete-button'>삭제</button>
                          </div>
                          <div class='modal-wrapper'>
                            <div class='password-modal'>
                              <div>비밀번호</div>
                              <input class='password-input' type='password' maxlength='6' />
                              <span class='password-error-message'>다시 입력해주세요.</span>
                              <div class='password-modal-buttons'>
                                <button class='password-modal-submit-button'>확인</button>
                                <button class='password-modal-cancle-button'>취소</button>
                              </div>
                            </div>
                          </div>
                      </li>
                      `;
                  })
                  .join('')}
            </ul>
    `;
    this.addEvents();
  }
  // <button class="edit-button">수정</button>

  addEvents() {
    this.querySelectorAll('li').forEach((li) => {
      const {
        toggleCommentModal,
        showPasswordConfirmModal,
        closePasswordConfirmModal,
        clearPasswordInput,
        deleteCommentSubmit,
      } = createListHooks(li);

      const clickModalButton = () => toggleCommentModal();
      const clickDeleteButton = () => showPasswordConfirmModal();
      const clickModalSubmitButton = async () => deleteCommentSubmit();
      const clickModalCancleButton = () => {
        closePasswordConfirmModal();
        clearPasswordInput();
      };

      li.querySelector('.comment-modal-button').addEventListener(
        'click',
        clickModalButton
      );

      li.querySelector('.delete-button').addEventListener(
        'click',
        clickDeleteButton
      );

      li.querySelector('.password-modal-cancle-button').addEventListener(
        'click',
        clickModalCancleButton
      );

      li.querySelector('.password-modal-submit-button').addEventListener(
        'click',
        clickModalSubmitButton
      );
    });
  }
}

export default CommentList;
