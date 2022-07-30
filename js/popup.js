/** Модуль "Всплывающее окно" **/

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const popupErrorMessage = errorPopup.querySelector('.error__message');
const errorButton = errorPopup.querySelector('.error__button');

// Функция показа модального окна при успешной отправке формы
const showModalSuccess = () => {
  document.body.append(successPopup);

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

// Функция показа модального окна при неудачной отправке формы
const showModalError = () => {
  popupErrorMessage.textContent = 'Ошибка загрузки данных';
  document.body.append(errorPopup);

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
