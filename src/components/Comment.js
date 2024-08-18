class Comment extends HTMLElement {
  css = `
    .comment-section {
        margin-bottom: 100px;
        color: white;
    }

    .input-container {
        display: flex;
        margin-top: 50px;

        @media screen and (max-width: 1050px) {
            flex-direction: column;
            gap: 10px;
        }
    }

    .input-container div {
        width: 300px;    
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 50px;
    }
    
    .input-container input{
        font-size: 16px;    
        background: none;
        outline: none;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 4px 8px;
        line-height: 1.5;
        transition: all 0.4s ease-in-out;
        border-radius: 8px;
    }

    .input-container input:focus {
        border: 1px solid white;
    }

    .textarea-container {
        margin-top: 40px;
    }

    .textarea {
        width: 100%;
        outline: none;
        color: white;
        background: none;
        padding: 10px 0px;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        transition: all 0.4s ease-in-out;
        font-size: 15px;
        resize: none;
        overflow: hidden;
    }

    .textarea-container .textarea:focus {
        border-bottom: 1px solid white;
    }

    .buttons-container {
        text-align: end;
        position: relative;
        top: 10px;
    }

    .buttons-container button {
        border-radius: 20px;
        margin-left: 15px;
        padding: 8px 15px;
        font-size: 16px;
        background: none;
        outline: none;
        border: none;
    }

    .button-cancel {
        color: white;
        cursor: pointer;
    }

    .button-cancel:hover {
        background-color: #3f3f3f;
    }

    .buttons-container{
        display: none;
    }

    .disabled {
        cursor: default;
        background-color: #272727;
        color: #666666;
    }

    .active {
        background-color: #539ee0 !important;
        color: black;
        cursor: pointer;
    }

    .active:hover {
        background-color: #65b8ff !important;
    }

    .comment-list{
        margin-top: 80px;
    }

    .comment-list li {
        margin-bottom: 15px;
    }

    .comment-list li span {
        margin-bottom: 5px;
    }

  `;

  template = () => {
    return `
    <div class='comment-section'>
        <div class='input-container'>
            <div>
                <label>닉네임: </label>
                <input class='nickname-input' type='text' maxlength='10'/>
            </div>
            <div>
                <label>비밀번호: </label>
                <input class='password-input' type='password' maxlength='6'/>
            </div>
        </div>
        <div class='comment-write'>
            <div class='textarea-container'>
                <textarea class='textarea' placeholder='댓글 추가..' rows='1'></textarea>
            </div>
            <div class='buttons-container'>
                <button class='button-cancel'>취소</button>
                <button class='button-submit disabled'>등록</button>
            </div>
            <ul class='comment-list'>
                ${this.comments
                  .map(
                    ({ip, nickname, content}) =>
                      `
                    <li>
                        <span>@${nickname}(${ip})</span>
                        <p>${content}</p>
                    </li>
                    `
                  )
                  .join('')}
            </ul>
        </div>
    </div>

  `;
  };

  constructor() {
    super();
    this.comments = [];

    this.render();
  }

  render() {
    this.innerHTML = `
        <style>${this.css}</style>
        ${this.template()}
    `;
    this.addEvents();
  }

  addEvents() {
    this.querySelector('.textarea').oninput = (e) => {
      const text = e.target.value;
      if (text === '') {
        this.disabledSubmitButton();
      } else {
        this.activeSubmitButton();
      }
    };

    this.querySelector('.textarea').addEventListener('focus', () => {
      this.toggleShowButtons(true);
    });

    this.querySelector('.button-cancel').addEventListener('click', () => {
      this.toggleShowButtons(false);
      this.clearAllInput();
      this.disabledSubmitButton();
    });

    this.querySelector('.button-submit').addEventListener('click', () => {
      const {nickname, password, content} = this.getInputData();

      if (nickname === '' || password === '') {
        return alert('아이디 또는 비밀번호를 입력해주세요.');
      }

      // 서버로 post 요청 날려서 댓글 생성
      // response로 comments 배열에 push
      this.comments.push({id: new Date(), nickname, content, password});
      this.render();
    });
  }

  toggleShowButtons(boolean) {
    if (boolean) {
      this.querySelector('.buttons-container').style = 'display: block';
    } else {
      this.querySelector('.buttons-container').style = 'display: none';
    }
  }

  clearAllInput() {
    this.querySelector('.textarea').value = '';
    this.querySelector('.nickname-input').value = '';
    this.querySelector('.password-input').value = '';
  }

  getInputData() {
    const content = this.querySelector('.textarea').value;
    const nickname = this.querySelector('.nickname-input').value;
    const password = this.querySelector('.password-input').value;

    return {nickname, password, content};
  }

  activeSubmitButton() {
    const submitButton = this.querySelector('.button-submit');
    submitButton.classList.remove('disabled');
    submitButton.classList.add('active');
    submitButton.disabled = false;
  }

  disabledSubmitButton() {
    const submitButton = this.querySelector('.button-submit');
    submitButton.classList.remove('active');
    submitButton.classList.add('disabled');
    submitButton.disabled = true;
  }
}

export default Comment;
