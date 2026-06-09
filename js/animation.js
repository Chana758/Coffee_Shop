/* ==========================================================
   animation.js — Scroll Reveal using Intersection Observer
   ========================================================== */

(function () {
  "use strict";

  // IntersectionObserver watches elements and fires a callback
  // when they enter the visible viewport.
  // We use this to trigger fade-in / slide-in animations without
  // a scroll event listener (much better for performance).

  // --- 1. Observer Options ---
  var observerOptions = {
    root:       null,      // null = viewport
    rootMargin: "0px 0px -60px 0px", // Trigger slightly before the bottom
    threshold:  0.12,      // Fire when 12% of element is visible
  };

  // --- 2. Callback — adds .visible class to trigger CSS transition ---
  function onIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop watching once revealed (no need to toggle off)
        observer.unobserve(entry.target);
      }
    });
  }

  // --- 3. Create observer ---
  var observer = new IntersectionObserver(onIntersect, observerOptions);

  // --- 4. Observe all elements with class .reveal or .reveal-stagger ---
  document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
    observer.observe(el);
  });

  // --- 5. Stagger delay for card grids ---
  // Automatically assign staggered animation delays to child items
  // inside elements with class .menu-grid or .gallery-grid
  document.querySelectorAll(".menu-grid, .gallery-grid").forEach(function (grid) {
    grid.querySelectorAll(".menu-card, .gallery-item").forEach(function (card, index) {
      // Small cumulative delay per card (max 0.5s)
      card.style.transitionDelay = Math.min(index * 0.1, 0.5) + "s";
    });
  });

  // --- 6. Number Counter Animation for statistics ---
  // When a .stat-number scrolls into view, count up from 0 to its value.
  function animateCounter(el) {
    var raw     = el.textContent.trim();
    var suffix  = raw.replace(/[0-9]/g, "");    // e.g. "+" or "K"
    var target  = parseInt(raw.replace(/\D/g, ""), 10); // numeric part
    var duration = 1500; // ms
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  // Observe stat numbers and start counting when visible
  var counterObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-number").forEach(function (el) {
    counterObserver.observe(el);
  });

})();
