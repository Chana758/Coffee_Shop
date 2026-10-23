/* darkmode.js — Light/dark theme toggle */
(function () {
  const KEY  = "brewsoul-theme";        // localStorage key
  const root = document.documentElement; // <html> element

  // Saved theme first, otherwise follow the system setting
  const getTheme = () =>
    localStorage.getItem(KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  // Apply a theme, save it, and update the toggle icon
  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);

    const icon = document.getElementById("toggleIcon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  // Switch between dark and light
  const toggle = () =>
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");

  // Click the toggle button
  document.getElementById("darkToggle")?.addEventListener("click", toggle);

  // Set the theme on page load
  apply(getTheme());

  // Follow system changes only if the user never chose a theme
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(KEY)) {
      apply(e.matches ? "dark" : "light");
    }
  });
})();