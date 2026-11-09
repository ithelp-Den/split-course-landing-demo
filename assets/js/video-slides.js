(function () {
  console.log('[VideoSlides] Script initialized for s6');

var VIDEO_MAP = {
  '1.webp':  'https://itden-cdn.b-cdn.net/stretching/sdk23o.MP4',
  '4.webp':  'https://itden-cdn.b-cdn.net/stretching/vd-2.mp4',
  '8.webp':  'https://itden-cdn.b-cdn.net/stretching/vd-3.mp4',
  '13.webp': 'https://itden-cdn.b-cdn.net/stretching/vd-4.mp4',
  '18.webp': 'https://itden-cdn.b-cdn.net/stretching/video2.MP4',
  '21.webp': 'https://itden-cdn.b-cdn.net/stretching/video4.MP4',
  '24.webp': 'https://itden-cdn.b-cdn.net/stretching/Instagram_15.04.2026_MiddleSplit_Video.mp4',
  '25.webp': 'https://itden-cdn.b-cdn.net/stretching/video5.MP4',
  '27.webp': 'https://itden-cdn.b-cdn.net/stretching/Instagram_15.04.2026_FullSplit_Video.MP4',
  '29.webp': 'https://itden-cdn.b-cdn.net/stretching/vd-10.mp4',
  '31.webp': 'https://itden-cdn.b-cdn.net/stretching/feur289aew.mp4',
  '32.webp': 'https://itden-cdn.b-cdn.net/stretching/vd-11.MP4',
  '34.webp': 'https://itden-cdn.b-cdn.net/stretching/Splits%20Course%20from%20Zubalenok%20on%20IG.mp4'
};

  // 1. Ініціалізація Swiper Слайдера
  function initSwiper() {
    var gallerySwiperEl = document.querySelector('.s6-swiper');
    if (gallerySwiperEl) {
      var swiper = new Swiper(gallerySwiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
          el: '.s6-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.s6-next',
          prevEl: '.s6-prev'
        }
      });

      swiper.on('slideChangeTransitionStart', killAllVideos);
      swiper.on('sliderMove', killAllVideos);
    }
  }

  // 2. Функція витягування посилання на відео з data-video або VIDEO_MAP
  function getVideoUrl(slide, img) {
    if (slide) {
      var directUrl = slide.getAttribute('data-video');
      if (directUrl) return directUrl;
    }
    if (!img) return null;
    var src = img.getAttribute('src') || img.getAttribute('data-src') || '';
    var filename = src.split('/').pop().split('?')[0];
    return VIDEO_MAP[filename] || null;
  }

  // 3. Знищення активних плеєрів та відновлення фотографій
  function killAllVideos() {
    var videos = document.querySelectorAll('.s6-slide video');
    videos.forEach(function (v) {
      v.pause();
      v.src = '';
      v.load();
      var parentSlide = v.closest('.s6-slide');
      if (parentSlide) {
        var parentImg = parentSlide.querySelector('.s6-img');
        if (parentImg) parentImg.style.cssText = '';
      }
      v.remove();
    });
  }

  // 4. Відкриття та відтворення відео
  function openVideo(slide, url) {
    killAllVideos();

    slide.style.setProperty('position', 'relative', 'important');
    slide.style.setProperty('overflow', 'hidden', 'important');

    var img = slide.querySelector('.s6-img');
    if (img) {
      img.style.cssText = 'visibility: hidden !important; opacity: 0 !important;';
    }

    var v = document.createElement('video');
    v.setAttribute('src', url);
    v.setAttribute('controls', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('preload', 'auto');
    v.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100% !important;min-height:100%;object-fit:cover;z-index:99;background:#000;display:block;border-radius:12px;outline:none;';

    v.addEventListener('ended', function () { 
      killAllVideos(); 
    });

    slide.appendChild(v);

    var p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch(function () {
        v.muted = true;
        v.play();
      });
    }
  }

  // 5. Глобальні слухачі подій
  function initGlobalListeners() {
    initSwiper();

    document.addEventListener('click', function (e) {
      if (e.target.tagName === 'VIDEO') return;

      var slide = e.target.closest('.s6-slide');
      if (!slide) return;

      var img = slide.querySelector('.s6-img');
      var url = getVideoUrl(slide, img);
      
      if (url) {
        e.preventDefault();
        e.stopPropagation();
        openVideo(slide, url);
      }
    }, true);

    document.addEventListener('touchmove', function (e) {
      if (e.target.tagName === 'VIDEO') return;
      if (e.target.closest('.s6-slide')) {
        killAllVideos();
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalListeners);
  } else {
    initGlobalListeners();
  }
})();