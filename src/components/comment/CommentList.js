import {fetchDeleteComment, fetchGetComments} from '../../http';
import state from '../../store';

class CommentList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.getCommentsAndRender();
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
                              <span>비밀번호</span>
                              <input type='password' maxlength='6' />
                              <div class='password-modal-buttons'>
                                <button>확인</button>
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

  // 이제 비밀번호 입력후 삭제 버튼 누를 시 삭제 되게 구현
  addEvents() {
    this.querySelectorAll('li').forEach((li) => {
      li.querySelector('.comment-modal-button').addEventListener(
        'click',
        () => {
          const commentModal = li.querySelector('.comment-modal');
          if (commentModal.style.display === 'flex') {
            commentModal.style.display = 'none';
          } else {
            this.querySelectorAll('.comment-modal').forEach((modal) => {
              modal.style.display = 'none';
            });
            commentModal.style.display = 'flex';
          }
        }
      );

      li.querySelector('.delete-button').addEventListener('click', () => {
        li.querySelector('.modal-wrapper').style.display = 'flex';
        li.querySelector('.comment-modal').style.display = 'none';
      });

      li.querySelector('.password-modal-cancle-button').addEventListener(
        'click',
        () => {
          li.querySelector('.modal-wrapper').style.display = 'none';
        }
      );
    });
  }

  async getCommentsAndRender() {
    const data = await fetchGetComments();
    state.comments = data;
    this.render();
  }
}

export default CommentList;
