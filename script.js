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

  // Handle Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const btn = this.querySelector("button");
      btn.innerText = "Sending...";

      // Send via EmailJS
      emailjs.sendForm("service_qzqzp2b", "template_8kporjp", this).then(
        () => {
          alert("Message Sent Successfully!");
          btn.innerText = "Send Message";
          this.reset();
        },
        (error) => {
          alert("FAILED to send message. Please try again.");
          console.log("FAILED...", error);
          btn.innerText = "Send Message";
        }
      );
    });
  }
});

/* 3. MOBILE MENU TOGGLE */
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      // Apply mobile-specific menu styles dynamically
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "60px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "#333";
      navLinks.style.zIndex = "1001";
    }
  }
}
