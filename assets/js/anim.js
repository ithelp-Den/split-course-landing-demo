document.addEventListener("DOMContentLoaded", () => {
  const pyramidContainer = document.querySelector(".s8-pyramid-container");
  
  if (!pyramidContainer) return;

  const observerOptions = {
    root: null, // відстежуємо відносно в'юпорту екрану
    rootMargin: "0px",
    threshold: 0.9 // анімація почнеться, коли 20% контейнера з'явиться на екрані
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Додаємо клас, який запускає CSS анімацію
        entry.target.classList.add("animated");
        // Припиняємо спостереження, щоб анімація не спрацьовувала повторно при кожному скролі
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(pyramidContainer);
});

document.addEventListener("DOMContentLoaded", () => {
  const statsBanner = document.querySelector(".s7-2-stats-banner");
  if (!statsBanner) return;

  const animateNumbers = (element) => {
    const targetText = element.textContent.trim();
    
    // Шукаємо тільки цифри (включаючи крапки/коми для десяткових або тисячних)
    const numericMatch = targetText.match(/[\d.,]+/);
    if (!numericMatch) return;

    const numericString = numericMatch[0];
    // Визначаємо оригінальний формат (чи є крапка, щоб потім її зберегти)
    const hasDot = numericString.includes('.');
    
    // Отримуємо чисте число для математичного підрахунку
    const targetValue = parseFloat(numericString.replace(/\./g, '').replace(/,/g, '.'));
    
    // Отримуємо все, що йде ДО та ПІСЛЯ числа (наприклад, "M" або "+")
    const prefix = targetText.split(numericString)[0] || "";
    const suffix = targetText.split(numericString)[1] || "";

    const duration = 2000; // Тривалість анімації в мілісекундах (2 секунди)
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Функція плавного сповільнення (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * targetValue;

      // Форматування числа назад під час анімації
      let formattedValue;
      if (hasDot) {
        // Якщо в оригіналі була крапка (як у 12.500), повертаємо її як роздільник тисячних
        formattedValue = Math.floor(currentValue).toString().replace(/\B(?=(\d{3})+(?!\n))/g, ".");
        
        // Маленький хак для специфічного формату "12.500" (якщо це дробове 12.5)
        if (numericString.includes('.') && numericString.split('.')[1].length === 3 && targetValue < 100000) {
           // Якщо це дробове число з 3 знаками після крапки
           formattedValue = (currentValue / 1000).toFixed(3).replace('.', '.');
        }
      } else {
        // Якщо крапки не було, просто округлюємо до цілого (або залишаємо 1 знак для мільйонів типу 2.2)
        if (targetText.includes('M')) {
          formattedValue = (currentValue).toFixed(1);
        } else {
          formattedValue = Math.floor(currentValue).toString();
        }
      }

      // Виводимо проміжний результат з префіксом та суфіксом
      element.textContent = `${prefix}${formattedValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // В самому кінці забиваємо залізобетонно оригінальний текст з макету
        element.textContent = targetText;
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // Налаштування Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 // Спрацює, коли 10% банеру з'явиться на екрані
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Знаходимо всі класи з числами всередині банеру
        const numbers = entry.target.querySelectorAll(".s7-2-stat-number");
        numbers.forEach(num => animateNumbers(num));
        
        // Вимикаємо спостереження, щоб анімація відпрацювала лише 1 раз за візит
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(statsBanner);
});

document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".s5-hero-graphic-2");
  if (!heroImage) return;

  const observerOptions = {
    root: null, // відстежуємо відносно екрану
    rootMargin: "0px",
    threshold: 0.75 // анімація почнеться, коли 15% зображення з'явиться на екрані
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Додаємо клас, який запускає плавний transition
        entry.target.classList.add("animated");
        // Припиняємо спостереження за цим елементом
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(heroImage);
});

document.addEventListener("DOMContentLoaded", () => {
  // Шукаємо всі картки блоку s4
  const cards = document.querySelectorAll(".s4-card");
  if (cards.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5 // Спрацює, як тільки з'явиться перші 10% елемента
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Оскільки ми хочемо, щоб вони йшли ланцюжком, активуємо відразу всі картки,
        // а CSS-затримка (transition-delay) зробить їх появу почерговою
        cards.forEach(card => card.classList.add("animated"));
        
        // Зупиняємо обсервер, щоб анімація спрацювала лише один раз
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Спостерігаємо за першою карткою як за стартовою точкою тригера
  observer.observe(cards[0]);
});


document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".s3-cards-container");
  if (!cardsContainer) return;

  const cards = cardsContainer.querySelectorAll(".s3-card");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5 // Анімація тригериться, коли 10% контейнера зайшло в екран
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Активуємо клас для кожної картки
        cards.forEach(card => card.classList.add("animated"));
        
        // Відписуємося від спостереження, щоб анімація не повторювалась
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(cardsContainer);
});

