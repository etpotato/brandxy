import Choices from 'choices.js';

const COLOR_PLACEHOLDER = '#777777';

const nativeSelect = document.querySelector('#review__select');
const nativePlaceholder = nativeSelect.querySelector('.review__comment-option--default');
const placeholderText = nativePlaceholder.textContent;

const renderPlaceholder = () => {
  const selectPlaceholder = document.querySelector('.choices__input option');
  const choicesPlaceholder = document.querySelector('.choices__inner .choices__item--selectable');

  selectPlaceholder.textContent = placeholderText;
  selectPlaceholder.setAttribute('value', '');

  choicesPlaceholder.textContent = placeholderText;
  choicesPlaceholder.style.color = COLOR_PLACEHOLDER;
  choicesPlaceholder.setAttribute('data-id', '');
  choicesPlaceholder.setAttribute('data-value', '');

  nativeSelect.addEventListener('addItem', () => {
    choicesPlaceholder.style.color = '';
  }, { once: true });
};

const options = {
  classNames: {
    listDropdown: 'choices__dropdown',
  },
  searchEnabled: false,
};

nativePlaceholder.remove();
nativeSelect.style.display = 'none';

new Choices(nativeSelect, options);

renderPlaceholder();
