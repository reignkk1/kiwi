import {fetchDeleteComment} from '../../http';
import state from '../../store';

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

export function createListHooks(list) {
  const passwordErrorMessage = list.querySelector('.password-error-message');
  const commentModal = list.querySelector('.comment-modal');
  const passwordInput = list.querySelector('.password-input');
  const modalWrapper = list.querySelector('.modal-wrapper');
  const id = list.id;

  const showPasswordError = (show) => {
    if (show) {
      passwordErrorMessage.style.display = 'block';
    } else {
      passwordErrorMessage.style.display = 'none';
    }
  };

  const toggleCommentModal = () => {
    if (commentModal.style.display === 'flex') {
      commentModal.style.display = 'none';
    } else {
      document
        .querySelectorAll('.comment-modal')
        .forEach((modal) => (modal.style.display = 'none'));
      commentModal.style.display = 'flex';
    }
  };

  const showPasswordConfirmModal = () => {
    modalWrapper.style.display = 'flex';
    commentModal.style.display = 'none';
    passwordErrorMessage.style.display = 'none';
  };

  const closePasswordConfirmModal = () => {
    modalWrapper.style.display = 'none';
  };

  const clearPasswordInput = () => {
    passwordInput.value = '';
  };

  const filterCommentsWithDifferentId = () => {
    state.comments = state.comments.filter(
      (comment) => comment.id !== Number(id)
    );
  };

  const deleteCommentSubmit = async () => {
    const result = await fetchDeleteComment(id, passwordInput.value);

    clearPasswordInput();
    if (result === 'success') {
      closePasswordConfirmModal();
      filterCommentsWithDifferentId();
      renderCommentList();
    } else {
      showPasswordError(true);
    }
  };

  return {
    showPasswordError,
    toggleCommentModal,
    showPasswordConfirmModal,
    closePasswordConfirmModal,
    clearPasswordInput,
    deleteCommentSubmit,
  };
}

export function maskingReqIp(reqIp) {
  reqIp = reqIp.split('.');
  reqIp.splice(2, 1, '♡');
  return reqIp.join('.');
}
