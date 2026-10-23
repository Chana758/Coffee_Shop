/* navbar.js — Mobile menu toggle & scroll style */
(function () {
  "use strict";

  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  // 1. Open/close the mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 2. Add .scrolled to the navbar after scrolling 30px
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  });
})();