import { createElement } from "./utils.js";

const commentsContainer = document.querySelector(".comments");

renderWriteComment();
renderCommentsList();

// 댓글쓰기 렌더링
function renderWriteComment() {
  const commentWrite = createElement("div", { class: "comment-write" });
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
