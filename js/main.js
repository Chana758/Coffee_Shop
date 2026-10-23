/* main.js — Shared page features:
   1. Menu filter tabs
   2. Testimonial carousel
   3. "Order Now" button feedback */

(function () {
  "use strict";

  // ===== 1. MENU FILTER TABS =====
  // Show/hide .menu-card by its data-category value.
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCards  = document.querySelectorAll(".menu-card");

  if (filterBtns.length && menuCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {

        // Highlight the clicked button
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        menuCards.forEach((card) => {
          const category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
            // Replay the reveal animation
            card.classList.remove("visible");
            setTimeout(() => card.classList.add("visible"), 20);
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // ===== 2. TESTIMONIAL CAROUSEL =====
  // Slides the track sideways; auto-plays every 5 seconds.
  const track    = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const btns = {
    prev: document.getElementById("prevBtn"),
    next: document.getElementById("nextBtn")
  };

  if (track && btns.prev && btns.next && dotsWrap) {
    const cards = track.querySelectorAll(".testimonial-card");
    let current = 0;      // index of the visible card
    let autoInterval;     // timer id

    // Move to a card (wraps around at both ends)
    const goTo = (index) => {
      current = (index + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      // Mark the matching dot as active
      dotsWrap.querySelectorAll(".dot").forEach((dot, i) =>
        dot.classList.toggle("active", i === current)
      );

      resetAutoPlay();
    };

    // Auto-play helpers
    const startAutoPlay = () => {
      autoInterval = setInterval(() => goTo(current + 1), 5000);
    };
    const resetAutoPlay = () => {
      clearInterval(autoInterval);
      startAutoPlay();
    };

    // Create one dot per card
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `dot ${i === 0 ? "active" : ""}`;
      dot.onclick = () => goTo(i);
      dotsWrap.appendChild(dot);
    });

    // Arrow buttons
    btns.prev.onclick = () => goTo(current - 1);
    btns.next.onclick = () => goTo(current + 1);

    // Pause on hover
    track.parentElement.onmouseenter = () => clearInterval(autoInterval);
    track.parentElement.onmouseleave = startAutoPlay;

    startAutoPlay();
  }

  // ===== 3. "ORDER NOW" BUTTON FEEDBACK (demo) =====
  document.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Show a green "Added!" state, then restore
      btn.textContent       = "Added!";
      btn.style.background  = "#2d7a4f";
      btn.style.color       = "#fff";
      btn.style.borderColor = "#2d7a4f";

      setTimeout(() => {
        btn.textContent       = "Order Now";
        btn.style.background  = "";
        btn.style.color       = "";
        btn.style.borderColor = "";
      }, 1800);
    });
  });

})();