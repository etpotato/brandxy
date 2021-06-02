const scrollBar = document.querySelector('.info__scroll');
const scrollKnob = scrollBar.querySelector('.info__scroll-knob');
const textTrack = document.querySelector('.info__track');
const text = textTrack.querySelector('.info__text');

let scrollKnobMaxTop,
  scrollKnobCurrentTop,
  scrollKnobPushY,
  textInitialY,
  textMaxOffset;

const onTextTrackScroll = () => {
  const currentOffset = (textInitialY - text.getBoundingClientRect().y) / textMaxOffset;
  const scrollKnobOffset = scrollKnobMaxTop * currentOffset;
  let scrollKnobTop;
  if (scrollKnobOffset <= 0) {
    scrollKnobTop = 0;
  } else if (scrollKnobOffset >= scrollKnobMaxTop) {
    scrollKnobTop = scrollKnobMaxTop;
  } else {
    scrollKnobTop = scrollKnobOffset;
  }
  requestAnimationFrame(() => {
    scrollKnob.style.top = `${scrollKnobTop}px`;
  });
};

const onScrollKnobPush = (evt) => {
  scrollKnobPushY = evt.y;
  scrollKnobCurrentTop = Number.parseInt(evt.target.style.top);
  textTrack.removeEventListener('scroll', onTextTrackScroll);
  document.addEventListener('pointermove', onScrollKnobMove);
  document.addEventListener('pointerup', onScrollKnobRelease);
  document.addEventListener('pointercancel', onScrollKnobRelease);
};

const onScrollKnobMove = (evt) => {
  const scrollKnobCurrentOffset = scrollKnobCurrentTop + evt.y - scrollKnobPushY;
  let scrollKnobTop;
  if (scrollKnobCurrentOffset <= 0) {
    scrollKnobTop = 0;
  } else if (scrollKnobCurrentOffset >= scrollKnobMaxTop) {
    scrollKnobTop = scrollKnobMaxTop;
  } else {
    scrollKnobTop = scrollKnobCurrentOffset;
  }
  const textCurrentOffset = (scrollKnobTop / scrollKnobMaxTop) * textMaxOffset;
  requestAnimationFrame(() => {
    scrollKnob.style.top = `${scrollKnobTop}px`;
    textTrack.scroll(0, textCurrentOffset);
  });
};

const onScrollKnobRelease = () => {
  textTrack.addEventListener('scroll', onTextTrackScroll);
  document.removeEventListener('pointermove', onScrollKnobMove);
  document.removeEventListener('pointerup', onScrollKnobRelease);
  document.removeEventListener('pointercancel', onScrollKnobRelease);
};

const onDocumentScroll = () => {
  textInitialY = textTrack.getBoundingClientRect().y;
};

const onWindowResize = () => {
  textMaxOffset = text.getBoundingClientRect().height - textTrack.getBoundingClientRect().height;
  scrollKnobMaxTop = scrollBar.getBoundingClientRect().height - scrollKnob.getBoundingClientRect().height;
  onDocumentScroll();
  onTextTrackScroll();
};

window.addEventListener('load', onWindowResize, {once: true});
window.addEventListener('resize', onWindowResize);
document.addEventListener('scroll', onDocumentScroll);
scrollKnob.addEventListener('pointerdown', onScrollKnobPush);
textTrack.addEventListener('scroll', onTextTrackScroll);
