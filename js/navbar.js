
// បង្កើត Function មួយ ហើយរត់ភ្លាមៗ
// ដើម្បីកុំឲ្យ Variable ខាងក្នុងប៉ះពាល់ Global Scope
(function () {
  // បើក Strict Mode
  // ជួយចាប់ Error មួយចំនួន និងសរសេរកូដឲ្យមានស្តង់ដារ
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

})();