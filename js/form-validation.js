/* ==========================================================
   form-validation.js — Contact Form Validation
   ========================================================== */

(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return; // Exit if form doesn't exist on this page

  // --- 1. Helper: show/clear error ---

  function showError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input)  input.classList.add("error");
    if (error)  error.textContent = message;
  }

  function clearError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input)  input.classList.remove("error");
    if (error)  error.textContent = "";
  }

  // --- 2. Individual validators ---

  function validateName() {
    var val = document.getElementById("name").value.trim();
    if (!val) {
      showError("name", "nameError", "Please enter your name.");
      return false;
    }
    if (val.length < 2) {
      showError("name", "nameError", "Name must be at least 2 characters.");
      return false;
    }
    clearError("name", "nameError");
    return true;
  }

  function validateEmail() {
    var val = document.getElementById("email").value.trim();
    // Simple but effective email regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      showError("email", "emailError", "Please enter your email address.");
      return false;
    }
    if (!emailRegex.test(val)) {
      showError("email", "emailError", "Please enter a valid email address.");
      return false;
    }
    clearError("email", "emailError");
    return true;
  }

  function validateSubject() {
    var val = document.getElementById("subject").value.trim();
    if (!val) {
      showError("subject", "subjectError", "Please enter a subject.");
      return false;
    }
    if (val.length < 3) {
      showError("subject", "subjectError", "Subject must be at least 3 characters.");
      return false;
    }
    clearError("subject", "subjectError");
    return true;
  }

  function validateMessage() {
    var val = document.getElementById("message").value.trim();
    if (!val) {
      showError("message", "messageError", "Please write your message.");
      return false;
    }
    if (val.length < 10) {
      showError("message", "messageError", "Message must be at least 10 characters.");
      return false;
    }
    clearError("message", "messageError");
    return true;
  }

  // --- 3. Real-time validation (validate on blur for better UX) ---
  // Blur fires when a field loses focus — less disruptive than 'input' while typing

  document.getElementById("name").addEventListener("blur", validateName);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document.getElementById("subject").addEventListener("blur", validateSubject);
  document.getElementById("message").addEventListener("blur", validateMessage);

  // Clear error as soon as user starts typing again
  ["name", "email", "subject", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id, id + "Error");
    });
  });

  // --- 4. Form submission ---

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission (static site, no backend)

    // Run all validators; collect results
    var isValid =
      validateName()    &
      validateEmail()   &
      validateSubject() &
      validateMessage();

    if (!isValid) return;

    // --- 5. Simulate successful submission ---
    // Disable submit button to prevent double submission
    var submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Simulate network delay with setTimeout
    setTimeout(function () {
      // Show success message
      var successEl = document.getElementById("formSuccess");
      if (successEl) {
        successEl.textContent = "Message sent! We'll get back to you within 24 hours.";
      }

      // Reset the form fields
      form.reset();

      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

      // Clear success message after 6 seconds
      setTimeout(function () {
        if (successEl) successEl.textContent = "";
      }, 6000);

    }, 1200);
  });

})();
