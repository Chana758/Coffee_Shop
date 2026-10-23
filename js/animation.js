/* animation.js — Scroll reveal, stagger delay, stat counters */
(function () {
  "use strict";

  // 1. Reveal elements when they enter the viewport
  const opts = { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.12 };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      obs.unobserve(e.target);   // animate only once
    });
  }, opts);

  document.querySelectorAll(".reveal, .reveal-stagger")
    .forEach((el) => revealObserver.observe(el));

  // 2. Stagger delay for cards and gallery items (max 0.5s)
  document.querySelectorAll(".menu-grid, .gallery-grid").forEach((grid) =>
    grid.querySelectorAll(".menu-card, .gallery-item").forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.1, 0.5) + "s";
    })
  );

  // 3. Count up numbers like "40+" or "50K"
  const animate = (el) => {
    const raw    = el.textContent.trim();
    const target = +raw.replace(/\D/g, "");     // digits only
    const suffix = raw.replace(/[0-9]/g, "");   // "+" or "K"
    let start = null;

    const step = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1500, 1);              // progress 0 → 1
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix; // ease-out
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      animate(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-number")
    .forEach((el) => counterObserver.observe(el));
})();