// Лічильники в блоці MEET YOUR COACH — прокручуються при доскролі (логіка як у anim.js)
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelector(".coach__stats");
  if (!stats) return;

  const animateNumber = (element) => {
    const targetText = element.textContent.trim(); // "2.2M", "60.000+", "12+"
    const numericString = targetText.match(/[\d.,]+/)[0];
    const prefix = targetText.split(numericString)[0] || "";
    const suffix = targetText.split(numericString)[1] || "";

    // "60.000" — крапка як роздільник тисяч, "2.2" — дробове число
    const isThousands = /^\d{1,3}([.,]\d{3})+$/.test(numericString);
    const separator = isThousands ? numericString.match(/[.,]/)[0] : "";
    const decimals = !isThousands && numericString.includes(".") ? numericString.split(".")[1].length : 0;
    const targetValue = isThousands
      ? parseInt(numericString.replace(/[.,]/g, ""), 10)
      : parseFloat(numericString);

    const duration = 2000; // Тривалість анімації в мілісекундах (2 секунди)
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Функція плавного сповільнення (easeOutQuad)
      const currentValue = progress * (2 - progress) * targetValue;

      let formattedValue = decimals
        ? currentValue.toFixed(decimals)
        : Math.floor(currentValue).toString();
      if (separator) formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

      element.textContent = `${prefix}${formattedValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // В самому кінці повертаємо оригінальний текст з макету
        element.textContent = targetText;
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".coach__stat b").forEach(animateNumber);
        // Анімація відпрацьовує лише 1 раз за візит
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: "0px", threshold: 0.5 });

  observer.observe(stats);
});
