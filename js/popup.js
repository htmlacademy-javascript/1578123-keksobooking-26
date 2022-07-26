/** Модуль "Всплывающее окно" **/

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const popupErrorMessage = errorPopup.querySelector('.error__message');
const errorButton = errorPopup.querySelector('.error__button');

const showModalSuccess = () => {
  document.body.appendChild(successPopup);

  const onEscapeClick = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', onEscapeClick);
    }
  };

  document.addEventListener('keydown', onEscapeClick);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown', onEscapeClick);
  });
};

const showModalError = () => {
  popupErrorMessage.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(errorPopup);

  const onEscapeClick = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown', onEscapeClick);
    }
  };

  document.addEventListener('keydown', onEscapeClick);

  errorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onEscapeClick);
  });

  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onEscapeClick);
  });
};

export {showModalSuccess, showModalError};
