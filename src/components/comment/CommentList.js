import {fetchGetComments} from '../../hooks';
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
                  .map(({nickname, text, reqIp}) => {
                    console.log(nickname, text, reqIp);
                    return `
                      <li>
                          <div>
                              <span>@${nickname} (${reqIp})</span>
                              <p>${text}</p>
                          </div>
                          <button class='comment-modal-button'>
                              <i class="fas fa-ellipsis-v"></i>
                          </button>
                          <div class='comment-modal'>
                              <div>
                                  <button>삭제</button>
                                  <button>수정</button>
                              </div>
                          </div>
                      </li>
                      `;
                  })
                  .join('')}
            </ul>
    `;
  }

  async getCommentsAndRender() {
    const data = await fetchGetComments();
    state.comments = data;
    this.render();
  }
}

export default CommentList;
