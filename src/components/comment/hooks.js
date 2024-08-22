export function toggleShowButtons(boolean) {
  if (boolean) {
    document.querySelector('.buttons-container').style = 'display: block';
  } else {
    document.querySelector('.buttons-container').style = 'display: none';
  }
}

export function disabledSubmitButton() {
  const submitButton = document.querySelector('.button-submit');
  submitButton.classList.remove('active');
  submitButton.classList.add('disabled');
  submitButton.disabled = true;
}

export function activeSubmitButton() {
  const submitButton = document.querySelector('.button-submit');
  submitButton.classList.remove('disabled');
  submitButton.classList.add('active');
  submitButton.disabled = false;
}

export function getInputData() {
  const text = document.querySelector('.textarea').value;
  const nickname = document.querySelector('.nickname-input').value;
  const password = document.querySelector('.password-input').value;

  return {nickname, password, text};
}

export function clearAllInput() {
  document.querySelector('.textarea').value = '';
  document.querySelector('.nickname-input').value = '';
  document.querySelector('.password-input').value = '';
}

export function renderCommentList() {
  document.querySelector('comment-list').render();
}

export async function fetchCreateComment(nickname, password, text) {
  const res = await fetch('http://localhost:8080/comment', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      nickname,
      password,
      text,
    }),
  });
  const data = await res.json();
  return data;
}

export async function fetchGetComments() {
  const res = await fetch('http://localhost:8080/comments');
  const data = await res.json();
  return data;
}
