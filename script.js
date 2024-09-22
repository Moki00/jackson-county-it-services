/* 1. INITIALIZE EMAILJS */
(function () {
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
      btn.innerText = "Sending...";

      // Get the selected service text for the subject line
      const serviceSelect = document.getElementById("service");
      const serviceName =
        serviceSelect.options[serviceSelect.selectedIndex].text;

      // Send via EmailJS
      emailjs
        .sendForm("service_qzqzp2b", "template_8kporjp", this, {
          service_subject: `New Quote Request: ${serviceName}`,
        })
        .then(
          () => {
            alert("Message Sent! We will get back to you shortly.");
            btn.innerText = "Send Message";
            this.reset();
          },
          (error) => {
            alert("Something went wrong. Please call us instead.");
            console.log("FAILED...", error);
            btn.innerText = "Send Message";
          }
        );
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
