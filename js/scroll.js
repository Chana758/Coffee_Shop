/* ==========================================================
   scroll.js — Smooth Scroll for Anchor Links
   ========================================================== */

(function () {
  "use strict";

  // Intercept clicks on internal anchor links (href starts with #)
  // and smoothly scroll to the target element, accounting for the navbar height.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1); // Remove the '#'
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Calculate top position minus navbar height so content isn't hidden behind navbar
      const navbarH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--navbar-h"),
        10
      ) || 72;

      const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const scrollTo   = elementTop - navbarH;

      window.scrollTo({
        top:      scrollTo,
        behavior: "smooth",
      });
    });
  });

})();
