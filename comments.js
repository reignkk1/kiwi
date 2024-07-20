import { createElement } from "./utils.js";

const commentsContainer = document.querySelector(".comments");

renderWriteComment();
renderCommentsList();

// 댓글쓰기 렌더링
function renderWriteComment() {
  const buttonsContainer = createElement("div", { class: "buttons-container" });
  const cancelButton = createElement("button", {
    class: "button-cancel",
    innerText: "취소",
  });
  const submitButton = createElement("button", {
    class: "button-submit submit-disabled",
    innerText: "등록",
  });
  buttonsContainer.append(cancelButton, submitButton);

  const commentWrite = createElement("div", { class: "comment-write" });

  const textareaContainer = createElement("div", {
    class: "textarea-container",
  });
  const textarea = createElement("textarea", {
    class: "textarea",
    placeholder: "댓글 추가..",
    rows: "1",
  });

  textarea.oninput = () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 1 + "px";

    if (textarea.value) {
      submitButton.classList.remove("submit-disabled");
      submitButton.classList.add("submit-active");
    } else {
      submitButton.classList.remove("submit-active");
      submitButton.classList.add("submit-disabled");
      submitButton.ariaDisabled = true;
    }
  };

  textareaContainer.appendChild(textarea);
  commentWrite.append(textareaContainer, buttonsContainer);
  commentsContainer.appendChild(commentWrite);
}

// 댓글 리스트 렌더링
function renderCommentsList() {
  const commentsList = createElement("ul", { class: "comments-list" });
  const comment = createElement("li", { class: "comment" });
  const nickname = createElement("div", { class: "nickname" });
  const content = createElement("p", { class: "content" });

  comment.append(nickname, content);
  commentsList.appendChild(comment);
  commentsContainer.appendChild(commentsList);
}
