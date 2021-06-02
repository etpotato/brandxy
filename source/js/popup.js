const ITEMS_NUMBER = 3;
const SWIPE_LENGTH = 50;
const SWIPE_TIME = 1000;
const ESC_KEYS = [
  'Escape',
  'Esc',
];

const openPopupButton = document.querySelector('.pros__link');
const popup = document.querySelector('.pros__popup');
const underlay = popup.querySelector('.pros__popup-underlay');
const closePopupButton = popup.querySelector('.pros__popup-close');
const title = document.querySelector('.pros__title');
const list = popup.querySelector('.pros__slider-list');
const items = Array.from(list.childNodes);
const arrowPrev = popup.querySelector('.pros__arrow--prev');
const arrowNext = arrowPrev.nextElementSibling;
const pagination = document.querySelector('.pros__pagination');
const dots = Array.from(pagination.querySelectorAll('.pros__pagination-button'));

let swipeStartX,
  swipeStartTime,
  swipeEndX,
  swipeEndTime;

const openPopup = () => {
  popup.style.display = 'grid';
  requestAnimationFrame(() => {
    popup.classList.add('pros__popup--active');
  });
  title.classList.add('pros__title--popup');
  arrowPrev.addEventListener('click', onArrowPrev);
  arrowNext.addEventListener('click', onArrowNext);
  list.addEventListener('touchstart', onListPush, {passive: true});
  underlay.addEventListener('click', onUnderlayClick);
  closePopupButton.addEventListener('click', onClosePopupButton);
  document.addEventListener('keydown', onEscPopup);
};

const onEscPopup = (evt) => {
  evt.preventDefault();
  if (ESC_KEYS.some((key) => evt.key === key)) {
    closePopup();
  }
};

const onClosePopupButton = (evt) => {
  evt.preventDefault();
  closePopup();
};

const onUnderlayClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const closePopup = () => {
  popup.addEventListener('transitionend', () => {
    popup.style.display = 'none';
  }, {
    once: true,
  });
  title.classList.remove('pros__title--popup');
  popup.classList.remove('pros__popup--active');
  arrowPrev.removeEventListener('click', onArrowPrev);
  arrowNext.removeEventListener('click', onArrowNext);
  list.removeEventListener('touchstart', onListPush, {passive: true});
  underlay.removeEventListener('click', onUnderlayClick);
  closePopupButton.removeEventListener('click', onClosePopupButton);
  document.removeEventListener('keydown', onEscPopup);
};

const changeDots = (index) => {
  const dotNumber = (items.length / (index + ITEMS_NUMBER)) - 1;
  const currentDot = dots.find((dot) => dot.classList.contains('pros__pagination-button--active'));
  currentDot.classList.remove('pros__pagination-button--active');
  dots[dotNumber].classList.add('pros__pagination-button--active');
};

const onArrowPrev = (evt) => {
  if (evt.cancelable) evt.preventDefault();
  const startIndex = items.findIndex((item) => item.classList.contains('pros__slider-item--active'));
  if (startIndex - ITEMS_NUMBER < 0) {
    return false;
  }
  for (let i = 0; i < ITEMS_NUMBER; i++) {
    items[startIndex + i].classList.remove('pros__slider-item--active');
    items[startIndex - ITEMS_NUMBER + i].classList.add('pros__slider-item--active');
  }
  changeDots(startIndex);
};

const onArrowNext = (evt) => {
  if (evt.cancelable) evt.preventDefault();
  const startIndex = items.findIndex((item) => item.classList.contains('pros__slider-item--active'));
  if (startIndex + ITEMS_NUMBER > items.length - 1) {
    return false;
  }
  for (let i = startIndex; i < startIndex + ITEMS_NUMBER; i++) {
    items[i].classList.remove('pros__slider-item--active');
    items[i + ITEMS_NUMBER].classList.add('pros__slider-item--active');
  }
  changeDots(startIndex);
};

const onListPush = (evt) => {
  swipeStartX = evt.targetTouches[0].clientX;
  swipeStartTime = evt.timeStamp;
  evt.stopPropagation();
  list.removeEventListener('touchstart', onListPush, {passive: true});
  document.addEventListener('touchmove', onListMove, {passive: false});
  document.addEventListener('touchend', onSwipeCancel);
  document.addEventListener('touchcancel', onSwipeCancel);
};

const onListMove = (evt) => {
  evt.preventDefault();
  swipeEndX = evt.targetTouches[0].clientX;
  swipeEndTime = evt.timeStamp;
  document.removeEventListener('touchend', onSwipeCancel);
  document.addEventListener('touchend', onListRelease);
};

const onListRelease = (evt) => {
  const swipeDiffX = swipeEndX - swipeStartX;
  const swipeDiffTime = swipeEndTime - swipeStartTime;
  list.addEventListener('touchstart', onListPush, {passive: true});
  document.removeEventListener('pointermove', onListMove, {passive: false});
  document.removeEventListener('touchend', onListRelease);
  document.removeEventListener('touchcancel', onSwipeCancel);
  if (Math.abs(swipeDiffX) < SWIPE_LENGTH || swipeDiffTime > SWIPE_TIME) {
    return false;
  }
  swipeStartX > swipeEndX ? onArrowNext(evt) : onArrowPrev(evt);
};

const onSwipeCancel = () => {
  document.addEventListener('touchstart', onListPush, {passive: true});
  document.removeEventListener('pointermove', onListMove, {passive: false});
  document.removeEventListener('touchend', onSwipeCancel);
  document.removeEventListener('touchcancel', onSwipeCancel);
};

openPopupButton.addEventListener('click', openPopup);
