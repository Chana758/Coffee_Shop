/* ==========================================================
   main.js — Shared Page Features:
     - Menu Filter Tabs
     - Testimonial Carousel
     - "Order Now" button alert
   ========================================================== */

(function () {
  "use strict";

  // ============================================================
  // 1. MENU FILTER TABS
  // ============================================================
  // Filter .menu-card elements by their data-category attribute.
  // Active filter button is highlighted; non-matching cards are hidden.

  var filterBtns = document.querySelectorAll(".filter-btn");
  var menuCards  = document.querySelectorAll(".menu-card");

  if (filterBtns.length && menuCards.length) {

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {

        // Update active button style
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        var filter = btn.getAttribute("data-filter");

        // Show / hide cards based on category
        menuCards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
            // Re-trigger reveal animation so cards animate in nicely
            card.classList.remove("visible");
            // Small delay before re-adding so CSS transition fires
            setTimeout(function () {
              card.classList.add("visible");
            }, 20);
          } else {
            card.classList.add("hidden");
          }
        });

      });
    });

  }

  // ============================================================
  // 2. TESTIMONIAL CAROUSEL
  // ============================================================
  // A simple manual + auto-advancing carousel.
  // The .testimonial-track is translated horizontally to show one card at a time.

  var track     = document.getElementById("testimonialTrack");
  var prevBtn   = document.getElementById("prevBtn");
  var nextBtn   = document.getElementById("nextBtn");
  var dotsWrap  = document.getElementById("carouselDots");

  if (track && prevBtn && nextBtn && dotsWrap) {

    var cards      = track.querySelectorAll(".testimonial-card");
    var total      = cards.length;
    var current    = 0;
    var autoInterval;

    // --- Build dot indicators ---
    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className    = "dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    // --- Move to a specific slide ---
    function goTo(index) {
      current = (index + total) % total; // Wrap around
      track.style.transform = "translateX(-" + current * 100 + "%)";

      // Update dot states
      dotsWrap.querySelectorAll(".dot").forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    // --- Prev / Next buttons ---
    prevBtn.addEventListener("click", function () {
      goTo(current - 1);
      resetAutoPlay();
    });

    nextBtn.addEventListener("click", function () {
      goTo(current + 1);
      resetAutoPlay();
    });

    // --- Auto-advance every 5 seconds ---
    function startAutoPlay() {
      autoInterval = setInterval(function () {
        goTo(current + 1);
      }, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoInterval);
      startAutoPlay();
    }

    startAutoPlay();

    // --- Pause auto-play when user hovers ---
    track.parentElement.addEventListener("mouseenter", function () {
      clearInterval(autoInterval);
    });

    track.parentElement.addEventListener("mouseleave", function () {
      startAutoPlay();
    });

    // --- Touch / swipe support for mobile ---
    var touchStartX = 0;

    track.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        resetAutoPlay();
      }
    }, { passive: true });

  }

  // ============================================================
  // 3. "ORDER NOW" BUTTON — feedback for demo purposes
  // ============================================================

  document.querySelectorAll(".card-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cardTitle = btn.closest(".menu-card").querySelector(".card-title");
      var name = cardTitle ? cardTitle.textContent : "this item";
      // Simple visual feedback (no alert popup)
      btn.textContent  = "Added!";
      btn.style.background = "#2d7a4f";
      btn.style.color      = "#fff";
      btn.style.borderColor = "#2d7a4f";
      setTimeout(function () {
        btn.textContent  = "Order Now";
        btn.style.background = "";
        btn.style.color      = "";
        btn.style.borderColor = "";
      }, 1800);
    });
  });

})();
