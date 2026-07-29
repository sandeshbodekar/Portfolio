/**
 * main.js
 * Progressive enhancement only — every page must remain usable,
 * navigable, and submittable with this file absent or blocked.
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    // JS is available, so we can safely collapse the nav on small
    // screens; markup defaults to "open" for no-JS users.
    var setOpen = function (isOpen) {
      nav.setAttribute("data-open", String(isOpen));
      toggle.setAttribute("aria-expanded", String(isOpen));
    };

    var isMobile = window.matchMedia("(max-width: 640px)").matches;
    setOpen(!isMobile);

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!expanded);
    });
  }

  /* ---------------------------------------------------------
     Contact form: inline, accessible validation feedback.
     Native HTML5 constraint attributes remain the source of
     truth; this only improves the messaging around them.
     --------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  var showError = function (field, message) {
    var errorEl = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message || "";
  };

  var validateField = function (field) {
    if (field.validity.valid) {
      showError(field, "");
      return true;
    }
    if (field.validity.valueMissing) {
      showError(field, "This field is required.");
    } else if (field.validity.typeMismatch && field.type === "email") {
      showError(field, "Enter an email address in the format name@example.com.");
    } else if (field.validity.tooShort) {
      showError(field, "Please enter a few more characters.");
    } else {
      showError(field, "Please check this field and try again.");
    }
    return false;
  };

  Array.prototype.forEach.call(form.elements, function (field) {
    if (field.tagName === "INPUT" || field.tagName === "TEXTAREA" || field.tagName === "SELECT") {
      field.addEventListener("blur", function () {
        validateField(field);
      });
    }
  });

  form.addEventListener("submit", function (event) {
    var valid = true;
    var firstInvalid = null;

    Array.prototype.forEach.call(form.elements, function (field) {
      if (field.tagName === "INPUT" || field.tagName === "TEXTAREA" || field.tagName === "SELECT") {
        var fieldValid = validateField(field);
        if (!fieldValid && !firstInvalid) firstInvalid = field;
        valid = valid && fieldValid;
      }
    });

    if (!valid) {
      event.preventDefault();
      if (status) {
        status.textContent = "Some fields need attention before this can be sent.";
      }
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is wired up in this skeleton — prevent the
    // default navigation and show a confirmation instead so the
    // accessible-form pattern can be demoed end to end.
    event.preventDefault();
    if (status) {
      status.textContent = "Thanks — your message looks ready to send. Connect this form to a backend or form service to deliver it.";
    }
    form.reset();
  });
})();
