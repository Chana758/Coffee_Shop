(function () {

  // Find the contact form by its id
  const form = document.getElementById("contactForm");

  // If the form is not found, stop execution
  if (!form) return;

  // Shortcut function for document.getElementById()
  const $ = (id) => document.getElementById(id);

  // Show an error message
  function error(id, msg) {

    // Add the error class to the input
    $(id).classList.add("error");

    // Display the error message
    $(id + "Error").textContent = msg;
  }

  // Clear an error message
  function clear(id) {

    // Remove the error class from the input
    $(id).classList.remove("error");

    // Clear the error message text
    $(id + "Error").textContent = "";
  }

  // Validate a single field
  function validate(id, fn) {

    // Get the input value and trim leading/trailing whitespace
    const val = $(id).value.trim();

    // If validation passes → clear the error and return true
    // If validation fails → return false
    return fn(val) ? (clear(id), true) : false;
  }

  // Validation rules
  const rules = {

    // Name must be at least 2 characters
    name: v =>
      v && v.length >= 2 ||
      "Name must be at least 2 characters.",

    // Email format check
    email: v =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
      "Invalid email.",

    // Subject must be at least 3 characters
    subject: v =>
      v && v.length >= 3 ||
      "Subject must be at least 3 characters.",

    // Message must be at least 10 characters
    message: v =>
      v && v.length >= 10 ||
      "Message must be at least 10 characters."
  };

  // Loop through all fields
  Object.keys(rules).forEach(id => {

    // Validate when the user leaves the input (blur)
    $(id).addEventListener("blur", () => {

      // Check the value
      const res = rules[id]($(id).value.trim());

      // If invalid → show the error
      if (res !== true) error(id, res);

      // If valid → clear the error
      else clear(id);
    });

    // When the user types → clear the error immediately
    $(id).addEventListener("input", () => clear(id));
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {

    // Prevent the form from reloading the page
    e.preventDefault();

    // Assume the form is valid
    let ok = true;

    // Validate all fields
    Object.keys(rules).forEach(id => {

      const res = rules[id]($(id).value.trim());

      // If there is an error
      if (res !== true) {

        error(id, res);

        ok = false;
      }
    });

    // If there are errors, stop submission
    if (!ok) return;

    // Find the submit button
    const btn = form.querySelector("[type=submit]");

    // Temporarily disable the button
    btn.disabled = true;

    // Change the button text
    btn.textContent = "Sending...";

    // Simulate sending data to a server
    setTimeout(() => {

      // Show the success message
      $("formSuccess").textContent = "Message sent!";

      // Reset the form
      form.reset();

      // Re-enable the button
      btn.disabled = false;

      // Restore the button text
      btn.textContent = "Send Message";

      // Clear the success message after 4 seconds
      setTimeout(() => {
        $("formSuccess").textContent = "";
      }, 4000);

    }, 1000);
  });

})();