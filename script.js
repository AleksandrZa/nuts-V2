let slider = document.querySelector('.slider'),
  sliderTrack = slider.querySelector('.slider__track'),
  slides = slider.querySelectorAll('.slider__card'),
  mainLine = document.querySelector('.header__main-line'),
  arrows = document.querySelector('.header__btns'),
  prevImg = document.querySelector('.img-back')
  nextImg = document.querySelector('.img-next')
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth + 40,
  slideIndex = 0,
  transition = 1,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posFinal = 0,
  posThreshold = slides[0].offsetWidth * 0.25,
  trfRegExp = /([-0-9.]+(?=px))/,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },

  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    if(chekWindWidth() >= 992){
      if(slideIndex > 2){
        slideIndex = 2;
      } else {

      }
    } else if(chekWindWidth() < 992 && chekWindWidth() >= 768) {
      if(slideIndex > 3){
        slideIndex = 3;
      } else {

      }
    } else if(chekWindWidth() < 768 && chekWindWidth() >= 576) {
      if(slideIndex > 4){
        slideIndex = 4;
      } else {

      }
    } else {
      if(slideIndex > 5){
        slideIndex = 5;
      } else {
      }
    }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

  },
  swipeStart = function() {
    let evt = getEvent();

    posInit = posX1 = evt.clientX;

    sliderTrack.style.transition = '';

    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    clearInterval(timer)
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;
    
    sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
  },
  swipeEnd = function() {
    posFinal = posInit - posX1;
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    
  

    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        if(slideIndex === 0) {
          slideIndex = 0
        } else {
          slideIndex--;
        }
      } else if (posInit > posX1) {
        slideIndex++;
      }
    }

    if (posInit !== posX1) {
      slide();
    }

  };

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

  slider.addEventListener('touchstart', swipeStart);

  arrows.addEventListener('click', function(event) {
    let target = event.target;
    if (target === next || target === nextImg) {

      if(chekWindWidth() <= 576){
        if(slideIndex >= 5){
          slideIndex = 5;
        } else {
          slideIndex++;
        }
        
      } else if(chekWindWidth() < 768 && chekWindWidth() >= 576){
        if(slideIndex >= 4){
          slideIndex = 4;
        } else {
          slideIndex++;
        }
      } else if(chekWindWidth() < 992 && chekWindWidth() >= 768){
        if(slideIndex >= 3){
          slideIndex = 3;
        } else {
          slideIndex++;
        }
      } else {
        if(slideIndex >= 2){
          slideIndex = 2;
        } else {
          slideIndex++;
        }
      }
    } else if (target === prev || target === prevImg) {
        if(slideIndex <= 0) {
          slideIndex = 0; 
        } else {
          slideIndex--;
        }
    } else {
      return;
    }
    clearInterval(timer)
    slide();
  });

  function chekWindWidth() {
    return document.body.clientWidth;
  };

    slides.forEach((item, num) => {
      function selCard() {
        slides.forEach(i => {
          i.classList.remove('card-active');
        })
        item.classList.add('card-active')
        mainLine.style.marginLeft = (num*16.7) + '%';
      }

      item.addEventListener('click', selCard)
    })
  

    const timer = setInterval(() => {
      start()
    }, 4000);

    cur = 0
    function start() {
      if(chekWindWidth() <= 576){
        if(cur >= 1500){
          cur = 1500
        } else {
          slideIndex++
          cur += 300
          sliderTrack.style.transform = `translate3d(-${cur}px, 0px, 0px)`
        }
      } else if(chekWindWidth() < 768 && chekWindWidth() >= 576) {
          if(cur >= 1200){
            cur = 1200
          } else {
            slideIndex++
            cur += 300
            sliderTrack.style.transform = `translate3d(-${cur}px, 0px, 0px)`
        }
      } else if(chekWindWidth() < 992 && chekWindWidth() >= 768) {
        if(cur >= 900){
          cur = 900
        } else {
          slideIndex++
          cur += 300
          sliderTrack.style.transform = `translate3d(-${cur}px, 0px, 0px)`
        }
      } else {
        if(cur >= 600){
          cur = 600
        } else {
          slideIndex++
          cur += 300
          sliderTrack.style.transform = `translate3d(-${cur}px, 0px, 0px)`
        }
      }
    }


