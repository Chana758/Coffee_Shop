/* ==========================================================
   darkmode.js — Dark / Light Mode Toggle
   ========================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "brewsoul-theme";

  // --- 1. Get stored preference or use system preference ---
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    // Fall back to OS-level preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // --- 2. Apply theme to the <html> element ---
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    // Update button icon
    const icon = document.getElementById("toggleIcon");
    if (icon) {
      icon.textContent = theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
    }
    // Store preference
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // --- 3. Toggle between light and dark ---
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // --- 4. Wire up the toggle button ---
  const btn = document.getElementById("darkToggle");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }

  // --- 5. Apply saved theme immediately (prevents flash of wrong theme) ---
  applyTheme(getPreferredTheme());

  // --- 6. Respect OS theme changes in real time ---
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    // Only auto-follow OS if user hasn't manually set a preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

})();
