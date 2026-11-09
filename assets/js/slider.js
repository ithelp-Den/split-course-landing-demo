document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Перший слайдер (rr-swiper)
  const rrSliderEl = document.querySelector('.rr-swiper');
  if (rrSliderEl) {
    new Swiper(rrSliderEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1.2,
      pagination: { el: '.rr-pagination', clickable: true },
      navigation: { nextEl: '.rr-btn-next', prevEl: '.rr-btn-prev' },
    });
  }

  // 2. Другий слайдер (rr-swiper-2)
  const rrSliderEl2 = document.querySelector('.rr-swiper-2');
  if (rrSliderEl2) {
    new Swiper(rrSliderEl2, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      pagination: { el: '.rr-pagination-2', clickable: true },
      navigation: { nextEl: '.rr-btn-next-2', prevEl: '.rr-btn-prev-2' },
    });
  }

  // 3. Третій слайдер (rr-swiper-3) — Повна копія конфігурації другого слайдера
  const rrSliderEl3 = document.querySelector('.rr-swiper-3');
  if (rrSliderEl3) {
    new Swiper(rrSliderEl3, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      pagination: { el: '.rr-pagination-3', clickable: true },
      navigation: { nextEl: '.rr-btn-next-3', prevEl: '.rr-btn-prev-3' },
    });
  }

  const bgSliderEl = document.querySelector('.bg-slider-swiper');
  if (bgSliderEl) {

    const bgSwiper = new Swiper(bgSliderEl, {
      loop: false,
      spaceBetween: 20,
      slidesPerView: 1,
      pagination: { el: '.bg-slider-pagination', clickable: true },
      navigation: { nextEl: '.bg-slider-btn-next', prevEl: '.bg-slider-btn-prev' },
    });

    // Зупиняємо всі відео при зміні слайду
    bgSwiper.on('slideChangeTransitionStart', () => {
      bgSliderEl.querySelectorAll('video').forEach(v => {
        if (!v.paused) {
          v.pause();
          v.removeAttribute('controls'); // Приховуємо контроли при зміні слайду
        }
      });
    });

    bgSliderEl.querySelectorAll('.swiper-slide').forEach(slide => {
      const video = slide.querySelector('video');
      if (!video) return;

      // Спочатку прибираємо контроли
      video.removeAttribute('controls');

      const playBtn = slide.querySelector('.bg-slider-play-btn');
      const wrapper = slide.querySelector('.bg-slider-media-wrapper');
      
      if (!wrapper) return;

      const overlay = document.createElement('div');
      overlay.className = 'bg-video-overlay';
      wrapper.appendChild(overlay);

      const stopAllOthers = () => {
        bgSliderEl.querySelectorAll('video').forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
            v.removeAttribute('controls');
          }
        });
      };

      const togglePlay = (e) => {
        e.preventDefault();
        if (video.paused) {
          stopAllOthers();
          bgSwiper.autoplay.stop();
          video.setAttribute('controls', 'true'); // Показуємо контроли при старті
          video.play();
          if (playBtn) playBtn.style.display = 'none';
        } else {
          video.pause();
        }
      };

      overlay.addEventListener('click', togglePlay);

      // Синхронізуємо стан
      video.addEventListener('play', () => {
        video.setAttribute('controls', 'true'); // Примусово показуємо
        if (playBtn) playBtn.style.display = 'none';
        overlay.style.pointerEvents = 'none'; // Дозволяємо клікати по відео, коли воно грає
      });

      video.addEventListener('pause', () => {
        video.removeAttribute('controls'); // Ховаємо контроли при паузі
        if (playBtn) playBtn.style.display = '';
        overlay.style.pointerEvents = 'auto'; // Перекриваємо знову для кнопки
        bgSwiper.autoplay.start();
      });

      video.addEventListener('ended', () => {
        video.removeAttribute('controls');
        if (playBtn) playBtn.style.display = '';
        overlay.style.pointerEvents = 'auto';
        bgSwiper.autoplay.start();
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {

  // 1. Ініціалізація нижнього текстового слайдера (простий Fade ефект)
  const s11TextSwiper = new Swiper('.s11-swiper-text', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    allowTouchMove: false, // Текст перемикається тільки разом з ноутбуком
    slidesPerView: 1,
    loop: false
  });

  // 2. Ініціалізація верхнього слайдера з кастомним 3D ефектом
  const s11LaptopSwiper = new Swiper('.s11-swiper-laptop', {
    effect: 'creative',
    grabCursor: true,
    loop: false,
    slidesPerView: 1,
    centeredSlides: true,
    
    // Конфігурація плавного 3D повороту та глибини
    creativeEffect: {
      prev: {
        translate: ['-65%', -60, -180], // Зсув ліворуч та вглиб екрана
        rotate: [0, 30, 0],          // Поворот по вертикальній осіY
        opacity: 0.4                 // Затемнення заднього плану
      },
      next: {
        translate: ['65%', -60, -180],  // Зсув праворуч та вглиб екрана
        rotate: [0, -30, 0],         // Поворот у зворотний бік
        opacity: 0.4
      }
    },
    
    // Підключення спільних елементів керування
    pagination: {
      el: '.s11-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s11 .btn-next',
      prevEl: '.s11 .btn-prev'
    }
  });

  // 3. СИНХРОНІЗАЦІЯ: Прив'язуємо рух ноутбуків до зміни тексту
  s11LaptopSwiper.controller.control = s11TextSwiper;

});