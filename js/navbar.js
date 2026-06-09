(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // ១. បើក/បិទ Sidebar (Hamburger click)
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

  }

  //២. ប្តូរ Style Navbar ពេល Scroll
  window.addEventListener("scroll", () => {
    if (navbar) {// navbar នៅក្នុង page ឬអត់?
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");// ពិនិត្យ “ស្ថានភាព scroll
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // ៣. បង្ហាញ Active State
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    // ពិនិត្យមើលថាតើ href របស់ Link ត្រូវនឹងទំព័រដែលកំពុងបើកដែរឬទេ
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
})();