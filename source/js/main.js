const SWIPE_LENGTH = 50;
const SWIPE_TIME = 1000;

const homeButton = document.querySelector('.header__nav-link');
const track = document.querySelector('.main__track');
const slides = Array.from(track.querySelectorAll('.main__slide'));
const forwardButton = track.querySelector('.main__link');
const nextSlideButtons = Array.from(track.querySelectorAll('.main__slide-button'));

let swipeStartX,
  swipeStartTime,
  swipeEndX,
  swipeEndTime,
  currentTrackX = 0;

const scrollPage = {
  forward (evt) {
    evt.preventDefault();
    const slideWidth = slides[0].getBoundingClientRect().width;
    currentTrackX -= slideWidth;
    if (Math.abs(currentTrackX) >= (slideWidth * slides.length)) {
      currentTrackX = -(slideWidth * (slides.length -1));
      return;
    }
    track.style.transform = `rotate(90deg) translateX(${currentTrackX}px)`;
  },
  backward (evt) {
    evt.preventDefault();
    const slideWidth = slides[0].getBoundingClientRect().width;
    currentTrackX += slideWidth;
    if (currentTrackX > 0) {
      currentTrackX = 0;
      return;
    }
    track.style.transform = `rotate(90deg) translateX(${currentTrackX}px)`;
  },
  home (evt) {
    evt.preventDefault();
    currentTrackX = 0;
    track.style.transform = `rotate(90deg) translateX(${currentTrackX}px)`;
  },
};

const onDocumentPush = (evt) => {
  swipeStartX = evt.targetTouches[0].clientX;
  swipeStartTime = evt.timeStamp;
  document.removeEventListener('touchstart', onDocumentPush, {passive: true});
  document.addEventListener('touchmove', onDocumentMove, {passive: false});
  document.addEventListener('touchend', onSwipeCancel);
  document.addEventListener('touchcancel', onSwipeCancel);
};

const onDocumentMove = (evt) => {
  evt.preventDefault();
  swipeEndX = evt.targetTouches[0].clientX;
  swipeEndTime = evt.timeStamp;
  document.removeEventListener('touchend', onSwipeCancel);
  document.addEventListener('touchend', onDocumentRelease);
};

const onDocumentRelease = (evt) => {
  const swipeDiffX = swipeEndX - swipeStartX;
  const swipeDiffTime = swipeEndTime - swipeStartTime;
  document.addEventListener('touchstart', onDocumentPush, {passive: true});
  document.removeEventListener('pointermove', onDocumentMove, {passive: false});
  document.removeEventListener('touchend', onDocumentRelease);
  document.removeEventListener('touchcancel', onSwipeCancel);
  if (Math.abs(swipeDiffX) < SWIPE_LENGTH || swipeDiffTime > SWIPE_TIME) {
    return false;
  }
  swipeDiffX > 0 ? scrollPage.backward(evt) : scrollPage.forward(evt);
};

const onSwipeCancel = () => {
  document.addEventListener('touchstart', onDocumentPush, {passive: true});
  document.removeEventListener('pointermove', onDocumentMove, {passive: false});
  document.removeEventListener('touchend', onSwipeCancel);
  document.removeEventListener('touchcancel', onSwipeCancel);
};

forwardButton.addEventListener('pointerdown', scrollPage.forward);

homeButton.addEventListener('pointerdown', scrollPage.home);
nextSlideButtons.forEach((button) => button.addEventListener('click', scrollPage.forward));
document.addEventListener('touchstart', onDocumentPush, {passive: true});
