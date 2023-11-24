// @see https://codepen.io/znematoadz/pen/VqZdmY
const slides = document.querySelectorAll('.slider-content');
const menuBtn = document.querySelector('.button-container');
const collapseNav = document.querySelector('.menu');
const pageNav = document.querySelectorAll('.navigator.dot');
const arrow = document.querySelector('#arrowIcon');

// handles page up for touch, scroll, mouse swipe
const pageUp = e => {
  if (e.target.nextElementSibling != null) {
    e.target.classList.add('prev');
    e.target.classList.remove('current');
    e.target.nextElementSibling.classList.add('current');
    e.target.nextElementSibling.classList.remove('next');
    let key = e.target.nextElementSibling.getAttribute('data-key');
    pageNav.forEach(item =>
      item.getAttribute('data-key') === key
        ? item.classList.add('selected')
        : item.classList.remove('selected')
    );
    if (e.target.nextElementSibling.nextElementSibling === null) {
      document.getElementById('footerWrapper').classList.add('last-slide');
      document.getElementById('footerNav').classList.add('last-slide');
      document.getElementById('arrowIcon').classList.add('last-slide');
    }
  }
};

// handles page down for touch, scroll, mouse swipe
const pageDown = e => {
  if (e.target.previousElementSibling != null) {
    e.target.classList.add('next');
    e.target.classList.remove('current');
    e.target.previousElementSibling.classList.add('current');
    e.target.previousElementSibling.classList.remove('prev');
    document.getElementById('footerWrapper').classList.remove('last-slide');
    document.getElementById('footerNav').classList.remove('last-slide');
    document.getElementById('arrowIcon').classList.remove('last-slide');
    let key = e.target.previousElementSibling.getAttribute('data-key');
    pageNav.forEach(item =>
      item.getAttribute('data-key') === key
        ? item.classList.add('selected')
        : item.classList.remove('selected')
    );
  }
};

const onScroll = e => {
  e.preventDefault();

  if (e.wheelDelta < 0) {
    pageUp(e);
  } else {
    pageDown(e);
  }
};

// hamburger menu animation and top nav extending
const navMenu = () => {
  menuBtn.classList.contains('active')
    ? (menuBtn.classList.remove('active'), collapseNav.classList.remove('open'))
    : (menuBtn.classList.add('active'), collapseNav.classList.add('open'));
};

// left-side page nav
const clickNav = e => {
  let key = e.target.getAttribute('data-key');

  slides.forEach(slide => {
    if (slide.getAttribute('data-key') === key) {
      e.target.classList.add('selected');
      slide.classList.add('current');
      slide.classList.remove('next');
      slide.classList.remove('prev');
      slide.nextElementSibling != null
        ? (slide.nextElementSibling.classList.add('next'),
          slide.nextElementSibling.classList.remove('current'),
          document
            .getElementById('footerWrapper')
            .classList.remove('last-slide'),
          document.getElementById('arrowIcon').classList.remove('last-slide'),
          document.getElementById('footerNav').classList.remove('last-slide'))
        : (document.getElementById('footerWrapper').classList.add('last-slide'),
          document.getElementById('arrowIcon').classList.add('last-slide'),
          document.getElementById('footerNav').classList.add('last-slide'));

      if (slide.previousElementSibling) {
        slide.previousElementSibling.classList.add('prev');
        slide.previousElementSibling.classList.remove('current');
      }
    } else {
      let slideKey = slide.getAttribute('data-key');

      slideKey > key
        ? (slide.classList.replace('current', 'next'),
          slide.classList.replace('prev', 'next'))
        : (slide.classList.replace('current', 'prev'),
          slide.classList.replace('next', 'prev'));

      pageNav.forEach(dot => {
        if (dot.getAttribute('data-key') === slideKey) {
          dot.classList.remove('selected');
        }
      });
    }
  });
};

let xDown = null;
let yDown = null;

const getTouches = e => {
  return e.touches;
};

const handleTouchStart = e => {
  if (e.type === 'mousedown') {
    xDown = e.clientX;
    yDown = e.clientY;
  } else {
    xDown = getTouches(e)[0].clientX;
    yDown = getTouches(e)[0].clientY;
  }
};

const handleTouchMove = e => {
  let xUp = null;
  let yUp = null;

  if (!xDown || !yDown) {
    return;
  }

  if (e.type === 'mouseup') {
    xUp = e.clientX;
    yUp = e.clientY;
  } else {
    xUp = e.touches[0].clientX;
    yUp = e.touches[0].clientY;
  }

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      //console.log('left');
    } else {
      /* right swipe */
      //console.log('right');
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
      pageUp(e);
    } else if (yDiff < 0) {
      /* down swipe */
      pageDown(e);
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};

const arrowDown = () => {
  let currentSlide;
  slides.forEach(slide => {
    if (slide.classList.contains('current')) {
      return (currentSlide = slide);
    }
  });
  if (currentSlide.nextElementSibling != null) {
    currentSlide.classList.replace('current', 'prev');
    currentSlide.nextElementSibling.classList.replace('next', 'current');
    let key = currentSlide.nextElementSibling.getAttribute('data-key');
    pageNav.forEach(item =>
      item.getAttribute('data-key') === key
        ? item.classList.add('selected')
        : item.classList.remove('selected')
    );
  }
  if (currentSlide.nextElementSibling.nextElementSibling === null) {
    document.getElementById('footerWrapper').classList.add('last-slide');
    document.getElementById('arrowIcon').classList.add('last-slide');
    document.getElementById('footerNav').classList.add('last-slide');
  }
};

window.addEventListener('wheel', onScroll);
arrow.addEventListener('click', arrowDown);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('mousedown', handleTouchStart, false);
document.addEventListener('mouseup', handleTouchMove, false);
menuBtn.addEventListener('click', navMenu);
pageNav.forEach(item => item.addEventListener('click', clickNav));
