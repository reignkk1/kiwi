import { createElement } from "./utils.js";

const commentsContainer = createElement("section", { class: "comments" });
const commentWrite = createElement("div", { class: "comment-write" });
const commentsList = createElement("ul", { class: "comments-list" });
const { buttonsContainer, cancelButton, submitButton } = createButtonsComment();
const { textareaContainer, textarea } = createTextAreaComment();
const { inputContainer, nicknameInput, passWordInput } = createInputs();

renderInputs();
renderCommentWrite();
renderCommentsList();
addEventListeners();

// 닉넴 input 구현
function renderInputs() {
  commentsContainer.appendChild(inputContainer);
}

// 댓글 쓰기 렌더링
function renderCommentWrite() {
  commentWrite.append(textareaContainer, buttonsContainer);
  commentsContainer.appendChild(commentWrite);
}

// 초기 댓글 리스트 렌더링
function renderCommentsList() {
  createComment("김민겸", "노래가 너무 좋습니다!");
}

// 이벤트 리스너들
function addEventListeners() {
  textarea.addEventListener("focus", () => {
    buttonsContainer.classList.remove("no-show");
  });

  textarea.oninput = () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 1 + "px";

    if (textarea.value) {
      activeSubmitButton(true);
    } else {
      activeSubmitButton(false);
    }
  };

  cancelButton.addEventListener("click", () => {
    textarea.value = "";
    buttonsContainer.classList.add("no-show");
    activeSubmitButton(false);
  });

  submitButton.addEventListener("click", () => {
    console.log(nicknameInput.value, passWordInput.value);

    if (!nicknameInput.value || !passWordInput.value) {
      return alert("아이디 또는 비밀번호를 입력해주세요!");
    }

    // 초기화 로직 짜기 따로 모듈로
    createComment(nicknameInput.value, textarea.value);
    nicknameInput.value = "";
    passWordInput.value = "";

    textarea.value = "";
    textarea.style.height = "auto";
    activeSubmitButton(false);
  });
}

// 등록 버튼 활성화
function activeSubmitButton(active) {
  if (active) {
    submitButton.classList.remove("submit-disabled");
    submitButton.classList.add("submit-active");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("submit-active");
    submitButton.classList.add("submit-disabled");
    submitButton.disabled = true;
  }
}

// 닉네임, 비밀번호 input 생성
function createInputs() {
  const inputContainer = createElement("div", { class: "input-container" });
  const nicknameContainer = createElement("div");
  const nicknameLabel = createElement("span", {
    class: "nickname-label",
    innerText: "닉네임: ",
  });
  const nicknameInput = createElement("input", {
    class: "nickname-input",
    type: "text",
    maxlength: "20",
  });

  const passWordContainer = createElement("div");
  const passWordLabel = createElement("span", {
    class: "passWord-label",
    innerText: "비밀번호: ",
  });
  const passWordInput = createElement("input", {
    class: "passWord-input",
    type: "password",
    maxlength: "6",
  });

  nicknameContainer.append(nicknameLabel, nicknameInput);
  passWordContainer.append(passWordLabel, passWordInput);

  inputContainer.append(nicknameContainer, passWordContainer);

  return {
    inputContainer,
    nicknameLabel,
    nicknameInput,
    passWordLabel,
    passWordInput,
  };
}

// 댓글 쓰는 TextArea 생성
function createTextAreaComment() {
  const textareaContainer = createElement("div", {
    class: "textarea-container",
  });
  const textarea = createElement("textarea", {
    class: "textarea",
    placeholder: "댓글 추가..",
    rows: "1",
  });

  textareaContainer.appendChild(textarea);
  return { textareaContainer, textarea };
}

// 취소, 등록 버튼 생성
function createButtonsComment() {
  const buttonsContainer = createElement("div", {
    class: "buttons-container no-show",
  });
  const cancelButton = createElement("button", {
    class: "button-cancel",
    innerText: "취소",
  });

  const submitButton = createElement("button", {
    class: "button-submit submit-disabled",
    innerText: "등록",
    disabled: "false",
  });
  buttonsContainer.append(cancelButton, submitButton);
  return { buttonsContainer, cancelButton, submitButton };
}

// 댓글 생성
function createComment(nickname, content) {
  const comment = createElement("li", { class: "comment" });
  const userNickname = createElement("div", {
    class: "nickname",
    innerText: "@" + nickname,
  });
  const commentContent = createElement("p", {
    class: "content",
    innerText: content,
  });

  comment.append(userNickname, commentContent);
  commentsList.appendChild(comment);
  commentsContainer.appendChild(commentsList);
}

export default commentsContainer;
