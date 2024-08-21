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

// 댓글 id 값 활용해서 ... 부호 클릭시 모달창 토글기능
// 삭제 기능 만들기
// 백엔드 서버 배포하기 => 클라우드타입
// 컴포넌트 모듈화 진행
