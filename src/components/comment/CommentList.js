import {fetchGetComments} from '../../http';
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
                              <button class='edit-button'>수정</button>
                          </div>
                      </li>
                      `;
                  })
                  .join('')}
            </ul>
    `;
    this.addEvents();
  }

  addEvents() {
    this.querySelectorAll('.comment-modal-button').forEach((button) => {
      const parent = button.parentElement;
      const commentModal = parent.querySelector('.comment-modal');

      button.addEventListener('click', () => {
        if (commentModal.style.display === 'flex') {
          commentModal.style.display = 'none';
        } else {
          this.querySelectorAll('.comment-modal').forEach((modal) => {
            modal.style.display = 'none';
          });
          commentModal.style.display = 'flex';
        }
      });
    });
  }

  async getCommentsAndRender() {
    const data = await fetchGetComments();
    state.comments = data;
    this.render();
  }
}

export default CommentList;
