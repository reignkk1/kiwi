class Comment extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
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
                <text-area></text-area>
                <button-container></button-container>
                <comment-list></comment-list>
            </div>
        </div>
      `;
  }
}

export default Comment;

// 모달창, 버튼 밖 클릭 시 모달창 닫기
