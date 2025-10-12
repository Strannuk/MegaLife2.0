// // // Анимация сайта

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация ScrollReveal
  const sr = ScrollReveal({
    distance: "50px",
    duration: 800,
    easing: "ease-out",
    viewFactor: 0.3,
    reset: false,
    opacity: 0,
  });

  // ==== Hero Section ====
  sr.reveal(".hero__title, .hero__text", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });

  sr.reveal(".hero__button", {
    origin: "bottom",
    delay: 400,
    duration: 1000,
  });

  // ==== Why Us Section ====
  sr.reveal(".why-us__title", {
    origin: "bottom",
    duration: 1000,
  });

  sr.reveal(".why-us__list-item", {
    origin: "right",
    interval: 200,
  });

  // ==== Surveillance & Control Sections ====
  document.querySelectorAll(".surveillance, .control").forEach((article, index) => {
    sr.reveal(article, {
      origin: index % 2 === 0 ? "left" : "right",
      delay: index * 150,
      duration: 1000,
    });
  });

  // ==== Paid Tariffs Section ====
  const tarifs = document.querySelectorAll(".paid__tarifs-list-item");
  tarifs.forEach((card, index) => {
    const groupIndex = Math.floor(index / 2);
    const origin = groupIndex % 2 === 0 ? "left" : "right";
    sr.reveal(card, {
      origin: origin,
      delay: index * 100,
      duration: 1000,
    });
  });

 // ==== Domofon & IPTV Sections ====
document.querySelectorAll(".domofon, .iptv").forEach((article, index) => {
  sr.reveal(article, {
    origin: index % 2 === 0 ? "left" : "right",
    delay: index * 150,
    duration: 1000,
  });
});

  // ==== Paid Methods Section ====
  sr.reveal(".paid__methods-title, .dropdown-list--decoration", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });

  // ==== Information Section ====
  sr.reveal(".information__text, .information__map", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });

  // ==== Feedback Section ====
  sr.reveal(".feedback__title, .feedback__subtitle, .feedback__form", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });

  // ==== FAQ Section ====
  sr.reveal(".faq__title, .dropdown-list--decoration", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });

  // ==== Footer ====
  sr.reveal(".footer__information-logo, .footer__contact, .footer__documents", {
    origin: "bottom",
    interval: 200,
    duration: 1000,
  });
});

// // //  Конец

// // Выпадающий список

function toggleDropdown(button) {
  const li = button.closest("li");
  const dropdown = li.querySelector(".dropdown");

  document.querySelectorAll(".dropdown").forEach((d) => {
    if (d !== dropdown && d.classList.contains("show-dropdown")) {
      d.style.height = "0";
      d.classList.remove("show-dropdown");
      d.closest("li").classList.remove("open");
    }
  });

  if (!dropdown.classList.contains("show-dropdown")) {
    li.classList.add("open");
    dropdown.classList.add("show-dropdown");
    const scrollHeight = dropdown.scrollHeight;
    dropdown.style.height = scrollHeight + 20 + "px";
  } else {
    li.classList.remove("open");
    dropdown.style.height = "0";
    dropdown.classList.remove("show-dropdown");
  }
}

// // Конец

// // Форма обратной связи

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".feedback__form");
  if (!form) return;

  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector("#phone");
  const messageInput = form.querySelector("textarea");

  function showError(el, text) {
    el.classList.add("error");
    let msg = el.parentNode.querySelector(".error-message");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "error-message";
      el.parentNode.appendChild(msg);
    }
    msg.textContent = text;
  }

  function removeError(el) {
    el.classList.remove("error");
    const msg = el.parentNode.querySelector(".error-message");
    if (msg) msg.remove();
  }

  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, "");
    });
    nameInput.addEventListener("paste", (e) => {
      const pasted =
        (e.clipboardData || window.clipboardData).getData("text") || "";
      const cleaned = pasted.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, "");
      if (cleaned !== pasted) {
        e.preventDefault();
        document.execCommand("insertText", false, cleaned);
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (!digits.startsWith("7")) digits = ("7" + digits).slice(0, 11);
      let formatted = "+" + (digits[0] || "7");
      if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
      if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
      if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
      if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
      e.target.value = formatted;
    });
  }

  document.querySelectorAll("[data-feedback]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      const feedbackSection = document.getElementById("feedback");
      if (feedbackSection)
        feedbackSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    [nameInput, phoneInput, messageInput].forEach((el) => removeError(el));

    if (!nameInput || nameInput.value.trim().length < 2) {
      showError(nameInput, "Введите имя (только буквы, минимум 2 символа)");
      nameInput.focus();
      return;
    }

    const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    if (!phoneInput || digits.length !== 11) {
      showError(phoneInput, "Введите полный номер: +7 (XXX) XXX-XX-XX");
      phoneInput.focus();
      return;
    }

    if (!messageInput || messageInput.value.trim().length === 0) {
      showError(messageInput, "Введите сообщение");
      messageInput.focus();
      return;
    }

    const dialog = document.getElementById("submitted__window");
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      const onClose = () => {
        document.body.style.overflow = "";
        dialog.removeEventListener("close", onClose);
      };
      dialog.addEventListener("close", onClose);
    } else {
      alert("Заявка отправлена!");
    }

    form.reset();
  });
});

//

// // Скролл прогрес бар

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = scrollPercent + "%";
});

//

// // Яндекс карта

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".information__map iframe");
  if (iframe) {
    iframe.src = iframe.dataset.src;
  }
});

// Конец

// Бургерное меню для мобильного телефона

const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-overlay');
const header = document.querySelector('.header');
const body = document.body;
const pageContent = document.querySelectorAll('body > :not(.mobile-menu):not(.mobile-overlay)'); // весь остальной контент

// Селекторы фокусируемых элементов
const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
let firstMenuEl, lastMenuEl;

// Функции для замыкания фокуса
function trapFocus() {
  const focusableEls = menu.querySelectorAll(focusableElements);
  if (focusableEls.length === 0) return;

  firstMenuEl = focusableEls[0];
  lastMenuEl = focusableEls[focusableEls.length - 1];

  // Делаем остальной контент недоступным для таба
  pageContent.forEach(el => el.setAttribute('inert', 'true'));

  document.addEventListener('keydown', handleTabKey);
  firstMenuEl.focus(); // автоматически фокусируем первый элемент меню
}

function releaseFocus() {
  document.removeEventListener('keydown', handleTabKey);
  // Делаем остальной контент снова доступным
  pageContent.forEach(el => el.removeAttribute('inert'));
}

function handleTabKey(e) {
  if (!menu.classList.contains('active')) return;

  if (e.key === 'Tab') {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstMenuEl) {
        e.preventDefault();
        lastMenuEl.focus();
      }
    } else { // Tab
      if (document.activeElement === lastMenuEl) {
        e.preventDefault();
        firstMenuEl.focus();
      }
    }
  }
}

// Клик по бургеру
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  header.classList.toggle('menu-open');
  body.classList.toggle('no-scroll');

  if (menu.classList.contains('active')) {
    trapFocus();
  } else {
    releaseFocus();
  }
});

// Клик по overlay (закрыть меню)
overlay.addEventListener('click', () => {
  burger.classList.remove('active');
  menu.classList.remove('active');
  overlay.classList.remove('active');
  header.classList.remove('menu-open');
  body.classList.remove('no-scroll');
  releaseFocus();
});

// Закрытие меню при клике на ссылки, телефон и кнопку
const closeTriggers = document.querySelectorAll(
  '.mobile-menu__list a, .mobile-menu__footer a, .mobile-menu__footer button'
);

closeTriggers.forEach(el => {
  el.addEventListener('click', () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    header.classList.remove('menu-open');
    body.classList.remove('no-scroll');
    releaseFocus();
  });
});

// Закрытие меню при изменении размера экрана
window.addEventListener('resize', () => {
  if (window.innerWidth > 767) { // точка перехода на десктоп
    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    header.classList.remove('menu-open');
    body.classList.remove('no-scroll');
    releaseFocus();
  }
});

// Конец







