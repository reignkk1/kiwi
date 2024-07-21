import { createElement } from "./utils.js";

const commentsContainer = document.querySelector(".comments");
const commentWrite = createElement("div", { class: "comment-write" });
const commentsList = createElement("ul", { class: "comments-list" });
const { buttonsContainer, cancelButton, submitButton } = createButtonsComment();
const { textareaContainer, textarea } = createTextAreaComment();

renderCommentWrite();
renderCommentsList();
addEventListeners();

// 닉넴 input 구현

function renderCommentWrite() {
  commentWrite.append(textareaContainer, buttonsContainer);
  commentsContainer.appendChild(commentWrite);
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
    createComment("김민겸", textarea.value);
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

// 초기 댓글 리스트 렌더링
function renderCommentsList() {
  createComment("김민겸", "노래가 너무 좋습니다!");
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
