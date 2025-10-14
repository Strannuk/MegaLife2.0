// ========================
//  Анимация сайта
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const sr = ScrollReveal({
    distance: "50px",
    duration: 800,
    easing: "ease-out",
    viewFactor: 0.3,
    reset: false,
    opacity: 0,
  });

  // Hero Section
  sr.reveal(".hero__title, .hero__text", { origin: "bottom", interval: 200, duration: 1000 });
  sr.reveal(".hero__button", { origin: "bottom", delay: 400, duration: 1000 });

  // Why Us Section
  sr.reveal(".why-us__title", { origin: "bottom", duration: 1000 });
  sr.reveal(".why-us__list-item", { origin: "right", interval: 200 });

  // Surveillance & Control Sections
  document.querySelectorAll(".surveillance, .control").forEach((article, index) => {
    sr.reveal(article, { origin: index % 2 === 0 ? "left" : "right", delay: index * 150, duration: 1000 });
  });

  // Paid Tariffs Section
  document.querySelectorAll(".paid__tarifs-list-item").forEach((card, index) => {
    const origin = Math.floor(index / 2) % 2 === 0 ? "left" : "right";
    sr.reveal(card, { origin, delay: index * 100, duration: 1000 });
  });

  // Domofon & IPTV Sections
  document.querySelectorAll(".domofon, .iptv").forEach((article, index) => {
    sr.reveal(article, { origin: index % 2 === 0 ? "left" : "right", delay: index * 150, duration: 1000 });
  });

  // Paid Methods, Information, Feedback, FAQ, Footer Sections
  sr.reveal(
    ".paid__methods-title, .dropdown-list--decoration, .information__text, .information__map, .feedback__title, .feedback__subtitle, .feedback__form, .faq__title, .footer__information-logo, .footer__contact, .footer__documents",
    { origin: "bottom", interval: 200, duration: 1000 }
  );
});

// ========================
//  Скролл к форме "Оставить заявку"
// ========================
document.querySelectorAll("[data-feedback]").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    const feedbackSection = document.getElementById("feedback");
    if (!feedbackSection) return;
    feedbackSection.scrollIntoView({ behavior: "smooth" });
    const firstInput = feedbackSection.querySelector('input[name="FIO"], textarea, input');
    if (firstInput) firstInput.focus({ preventScroll: true });
  });
});

// ========================
//  Выпадающий список
// ========================
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
    dropdown.style.height = dropdown.scrollHeight + 20 + "px";
  } else {
    li.classList.remove("open");
    dropdown.style.height = "0";
    dropdown.classList.remove("show-dropdown");
  }
}

// ========================
//  Скролл прогресс бар
// ========================
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = scrollPercent + "%";
});

// ========================
//  Яндекс карта (ленивая загрузка)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".information__map iframe");
  if (iframe) iframe.src = iframe.dataset.src;
});

// ========================
//  Бургерное меню для мобильного телефона
// ========================
const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-overlay');
const header = document.querySelector('.header');
const body = document.body;
const pageContent = document.querySelectorAll('body > :not(.mobile-menu):not(.mobile-overlay)');
const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
let firstMenuEl, lastMenuEl;

function trapFocus() {
  const focusableEls = menu.querySelectorAll(focusableElements);
  if (!focusableEls.length) return;
  firstMenuEl = focusableEls[0];
  lastMenuEl = focusableEls[focusableEls.length - 1];
  pageContent.forEach(el => el.setAttribute('inert', 'true'));
  document.addEventListener('keydown', handleTabKey);
  firstMenuEl.focus();
}

function releaseFocus() {
  document.removeEventListener('keydown', handleTabKey);
  pageContent.forEach(el => el.removeAttribute('inert'));
}

function handleTabKey(e) {
  if (!menu.classList.contains('active')) return;
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstMenuEl) { e.preventDefault(); lastMenuEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastMenuEl) { e.preventDefault(); firstMenuEl.focus(); }
  }
}

function closeMobileMenu() {
  burger.classList.remove('active');
  menu.classList.remove('active');
  overlay.classList.remove('active');
  header.classList.remove('menu-open');
  body.classList.remove('no-scroll');
  releaseFocus();
}

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  header.classList.toggle('menu-open');
  body.classList.toggle('no-scroll');
  menu.classList.contains('active') ? trapFocus() : releaseFocus();
});

overlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-menu__list a, .mobile-menu__footer a, .mobile-menu__footer button').forEach(el => el.addEventListener('click', closeMobileMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 767) closeMobileMenu(); });

// ========================
//  Форма согласия обработки данных
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".feedback__form");
  if (!form) return;

  const nameInput = form.querySelector('input[name="FIO"]');
  const phoneInput = form.querySelector("#phone");
  const messageInput = form.querySelector('textarea[name="message"]');
  const agreementCheckbox = form.querySelector('input[name="agreement"]');
  const agreementDialog = document.getElementById("agreement-dialog");
  const acceptBtn = document.getElementById("accept-agreement");
  const declineBtn = document.getElementById("decline-agreement");
  const submittedDialog = document.getElementById("submitted__window");

  let errorContainer = form.querySelector(".feedback-error-container");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.className = "feedback-error-container";
    messageInput.parentNode.insertBefore(errorContainer, messageInput.nextSibling);
  }

  const showError = text => { errorContainer.textContent = text; errorContainer.style.display = "block"; };
  const clearError = () => { errorContainer.textContent = ""; errorContainer.style.display = "none"; };

  // Валидация имени
  if (nameInput) {
    nameInput.addEventListener("input", e => { e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, ""); });
    nameInput.addEventListener("paste", e => {
      const pasted = (e.clipboardData || window.clipboardData).getData("text") || "";
      const cleaned = pasted.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, "");
      if (cleaned !== pasted) { e.preventDefault(); document.execCommand("insertText", false, cleaned); }
    });
  }

  // Форматирование телефона
  if (phoneInput) {
    phoneInput.addEventListener("input", e => {
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

  const openDialog = dialog => {
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      dialog.addEventListener("close", () => { document.body.style.overflow = ""; });
    }
  };

  // Модалка согласия
  if (agreementCheckbox && agreementDialog) {
    agreementCheckbox.addEventListener("change", () => {
      if (agreementCheckbox.checked) { openDialog(agreementDialog); agreementCheckbox.checked = false; }
    });
    acceptBtn.addEventListener("click", () => { agreementCheckbox.checked = true; agreementDialog.close(); });
    declineBtn.addEventListener("click", () => { agreementCheckbox.checked = false; agreementDialog.close(); });
  }

  // Отправка формы
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); clearError();

    if (!nameInput || nameInput.value.trim().length < 2) { showError("Введите имя (только буквы, минимум 2 символа)"); nameInput.focus(); return; }
    const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    if (!phoneInput || digits.length !== 11) { showError("Введите полный номер: +7 (XXX) XXX-XX-XX"); phoneInput.focus(); return; }
    if (!messageInput || messageInput.value.trim().length === 0) { showError("Введите сообщение"); messageInput.focus(); return; }
    if (!agreementCheckbox || !agreementCheckbox.checked) { showError("Необходимо согласие на обработку персональных данных"); agreementCheckbox.focus(); return; }

    const data = { FIO: nameInput.value.trim(), telephone: phoneInput.value.trim(), message: messageInput.value.trim() };
    try {
      const res = await fetch("/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) { openDialog(submittedDialog); form.reset(); }
      else showError("Ошибка отправки: " + (result.error || "неизвестная ошибка"));
    } catch (err) { console.error(err); showError("Ошибка отправки: " + err.message); }
  });
});
