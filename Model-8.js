document.addEventListener("DOMContentLoaded", () => {
  // 🧼 Tooltip ritualizado con jQuery plugin
  if (typeof jQuery !== "undefined" && typeof jQuery.fn.style_my_tooltips === "function") {
    $("a[title]").style_my_tooltips({
      tip_follows_cursor: false,
      tip_delay_time: 90,
      tip_fade_speed: 600,
      attribute: "title"
    });
  }
  
  // ♒ Zodiac Modal
const btnRight = document.getElementById("btn-right");
const zodiacModal = document.getElementById("zodiacModal");
const zodiacClose = zodiacModal?.querySelector(".close");
const horoscopeText = document.getElementById("horoscopeText");

if (btnRight && zodiacModal && zodiacClose) {

  btnRight.addEventListener("click", () => {
    zodiacModal.style.display = "flex";

    // text demo
    if (horoscopeText) {
      horoscopeText.innerHTML = `
        Today your energy is shifting toward transformation.<br><br>
        Trust your intuition, release what no longer serves you,
        and let the universe guide your next step ✨
      `;
    }
  });

  zodiacClose.addEventListener("click", () => {
    zodiacModal.style.display = "none";
  });

  zodiacModal.addEventListener("click", (e) => {
    if (e.target === zodiacModal) {
      zodiacModal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      zodiacModal.style.display = "none";
    }
  });
}

const zodiacTitle = document.getElementById("zodiacTitle");

function getCurrentZodiac() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "♒ Aquarius";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "♓ Pisces";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "♈ Aries";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "♉ Taurus";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "♊ Gemini";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "♋ Cancer";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "♌ Leo";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "♍ Virgo";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "♎ Libra";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "♏ Scorpio";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "♐ Sagittarius";
  return "♑ Capricorn";
}

if (zodiacTitle) {
  zodiacTitle.textContent = `${getCurrentZodiac()} Horoscope`;
}

  // 🖼️ Inicialización de galería pxuPhotoset
  if (typeof jQuery !== "undefined" && typeof jQuery.fn.pxuPhotoset === "function") {
    $('.photo-slideshow').pxuPhotoset({
      lightbox: true,
      rounded: false,
      gutter: '1px',
      borderRadius: '0px',
      photoset: '.photo-slideshow',
      photoWrap: '.photo-data',
      photo: '.pxu-photo'
    });
  }

  // 🖼️ Modal emocional — activado por botón central, cerrado por ❌, ESC o clic externo
  const btnCenter = document.getElementById("btn-center");
  const modal = document.getElementById("image-modal");
  const closeBtn = document.getElementById("close-modal");

  if (btnCenter && modal && closeBtn) {
    btnCenter.addEventListener("click", () => {
      modal.classList.add("show");
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    });
  }

  // 🎞️ Animación de imágenes laterales
  const sidepicz = document.getElementById("sidepicz");
  const sidepicz2 = document.getElementById("sidepicz2");

  if (sidepicz) {
    sidepicz.addEventListener("mouseenter", () => {
      sidepicz.classList.add("slide-out");
      sidepicz.classList.remove("slide-in");
    });

    sidepicz.addEventListener("mouseleave", () => {
      sidepicz.classList.remove("slide-out");
      sidepicz.classList.add("slide-in");
    });
  }

  if (sidepicz2) {
    sidepicz2.addEventListener("mouseenter", () => {
      sidepicz2.classList.add("slide-out");
      sidepicz2.classList.remove("slide-in");
    });

    sidepicz2.addEventListener("mouseleave", () => {
      sidepicz2.classList.remove("slide-out");
      sidepicz2.classList.add("slide-in");
    });
  }

  // 🧭 Navegación entre pestañas rituales
  window.openAlytut = function(evt, alytutName) {
    const sections = document.getElementsByClassName("alytut");
    const tabs = document.getElementsByClassName("tablink");

    Array.from(sections).forEach(section => section.style.display = "none");
    Array.from(tabs).forEach(tab => tab.classList.remove("tabzact"));

    document.getElementById(alytutName).style.display = "block";
    evt.currentTarget.classList.add("tabzact");
  };

  // 🔊 Reproducción interna
  const audio = document.getElementById('audio');
  const playBtn = document.querySelector('.playy');
  const pauseBtn = document.querySelector('.pausee');

  if (audio && playBtn && pauseBtn) {
    playBtn.addEventListener('click', () => {
      audio.play();
    });

    pauseBtn.addEventListener('click', () => {
      audio.pause();
    });
  }

  // 🧙‍♂️ Cursor Cometa — visual emocional que responde al movimiento
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  let lastX = 0, lastY = 0;
  let lastTime = performance.now();
  let lastMove = Date.now();

  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    const dt = now - lastTime || 16;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const speed = Math.min(Math.sqrt(dx * dx + dy * dy) / dt, 2.5);

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
    lastMove = now;

    cursor.classList.remove('idle');
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${1 + speed * 0.3}, ${1 - speed * 0.1})`;

    const estela = document.getElementById("estela");
    if (estela) {
      estela.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 12}px) rotate(-15deg) scaleX(1.2)`;
    }
  });

  document.addEventListener('mousedown', () => {
    cursor.style.background = 'radial-gradient(circle at 30% 30%, #ff5555, #990000)';
    cursor.style.transform += ' scale(1.3)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.background = 'radial-gradient(circle at 30% 30%, #ff2a2a, #b30000)';
  });

  setInterval(() => {
    if (Date.now() - lastMove > 800) {
      cursor.classList.add('idle');
    }
  }, 200);
});