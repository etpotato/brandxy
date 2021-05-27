const MEDIA_DESKTOP = '(min-width: 768px)';

const imageWrapper = document.querySelector('.article__image-wrapper');
const image = imageWrapper.querySelector('.article__image');
const scrollBar = document.querySelector('.article__figure-scrollbar');
const scrollThumb = scrollBar.querySelector('.article__figure-scrollthumb');

let scrollThumbMaxLeft = null;
let imageInitialX = null;
let imageMaxOffset = null;

const onImageWrapperScroll = () => {
  requestAnimationFrame(() => {
    const currentOffset = (imageInitialX - image.getBoundingClientRect().x) / imageMaxOffset;
    const srcollThumbOffset = scrollThumbMaxLeft * currentOffset;
    let srcollThumbLeft = null;

    if (srcollThumbOffset <= 0) {
      srcollThumbLeft = 0;
    } else if (srcollThumbOffset >= scrollThumbMaxLeft) {
      srcollThumbLeft = scrollThumbMaxLeft;
    } else {
      srcollThumbLeft = srcollThumbOffset;
    }

    scrollThumb.style.left = `${srcollThumbLeft}%`;
  });
};

const onMobileResize = () => {
  scrollThumbMaxLeft = (scrollBar.getBoundingClientRect().width - scrollThumb.getBoundingClientRect().width) / scrollBar.getBoundingClientRect().width * 100;
  imageInitialX = imageWrapper.getBoundingClientRect().x;
  imageMaxOffset = image.getBoundingClientRect().width - imageWrapper.getBoundingClientRect().width;

  onImageWrapperScroll();
};

imageWrapper.classList.remove('article__image-wrapper--no-js');

const media = window.matchMedia(MEDIA_DESKTOP);

if (!media.matches) {
  onMobileResize();
  imageWrapper.addEventListener('scroll', onImageWrapperScroll);
  window.addEventListener('resize', onMobileResize);
}

media.addEventListener('change', (evt) => {
  if (evt.matches) {
    imageWrapper.removeEventListener('scroll', onImageWrapperScroll);
    window.removeEventListener('resize', onMobileResize);
    return;
  }

  onMobileResize();
  imageWrapper.addEventListener('scroll', onImageWrapperScroll);
  window.addEventListener('resize', onMobileResize);
});
