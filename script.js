/* 1. INITIALIZE EMAILJS */

(function () {
  if (typeof emailjs === "undefined") {
    console.warn("EmailJS not functional on this page.");
    return;
  }
  console.log("Initializing EmailJS");
  emailjs.init({
    publicKey: "WuOhmac_rF3BPJy-3",
  });
})();

/* 2. CORE SITE FUNCTIONALITY */
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const yearSpan = document.getElementById("displayDateYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const btn = this.querySelector("button");
      btn.innerText = "Verifying...";

      //reCAPTCHA v3 Execution
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6Ld_nzcsAAAAAPeopYqohgsinz7pR_hIej7qcE-R", {
            action: "submit",
          })
          .then(function (token) {
            console.log("reCAPTCHA Token generated:", token);

            // EmailJS logic
            btn.innerText = "Sending...";

            // Get the selected service as text
            const serviceSelect = document.getElementById("service");
            let serviceLabel =
              serviceSelect.options[serviceSelect.selectedIndex].text;
            serviceLabel = serviceLabel
              .trim()
              .replace("/", "or")
              .replace("&", "and");

            // Prepare the template parameters
            const templateParams = {
              name: document.getElementById("user-name").value,
              email: document.getElementById("user-email").value,
              service: serviceLabel,
              message: document.getElementById("message").value,
              "g-recaptcha-response": token, // Pass the token to EmailJS if template needs it
            };

            // Send via EmailJS
            emailjs
              .send("service_qzqzp2b", "template_8kporjp", templateParams)
              .then(
                () => {
                  window.location.href = "pages/thank-you.html";
                },
                (error) => {
                  alert(
                    "Something went wrong. Please call us at 470-272-0054."
                  );
                  btn.innerText = "Call 470-272-0054";
                }
              );
          });
      });
    });
  }
});

/* 3. MOBILE MENU TOGGLE */
function toggleMenu() {
  const nav = document.querySelector(".main-nav");
  const navLinks = document.getElementById("navLinks");

  if (nav && navLinks) {
    nav.classList.toggle("active");
    navLinks.classList.toggle("active");
  }
}

/* 4. BACK TO TOP BUTTON LOGIC */
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", function () {
    // Show the button when the user scrolls down 300px
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Creates that nice scrolling animation
    });
  });
}
