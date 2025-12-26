// Contact Form Submission with reCAPTCHA v3
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop form immediately

    const btn = this.querySelector("button");
    btn.innerText = "Verifying..."; // Give user feedback

    // reCAPTCHA v3 Execution
    grecaptcha.ready(function () {
      grecaptcha
        .execute("YOUR_RECAPTCHA_SITE_KEY", { action: "submit" })
        .then(function (token) {
          console.log("reCAPTCHA Token generated:", token);

          // Now proceed with your existing EmailJS logic
          btn.innerText = "Sending...";

          const serviceSelect = document.getElementById("service");
          let serviceLabel =
            serviceSelect.options[serviceSelect.selectedIndex].text;
          serviceLabel = serviceLabel
            .trim()
            .replace("/", "or")
            .replace("&", "and");

          const templateParams = {
            name: document.getElementById("user-name").value,
            email: document.getElementById("user-email").value,
            service: serviceLabel,
            message: document.getElementById("message").value,
            "g-recaptcha-response": token, // Pass the token to EmailJS if your template needs it
          };

          emailjs
            .send("service_qzqzp2b", "template_8kporjp", templateParams)
            .then(
              () => {
                window.location.href = "pages/thank-you.html";
              },
              (error) => {
                console.error("EmailJS Error:", error);
                alert("Something went wrong. Please call us at 470-272-0054.");
                btn.innerText = "Call 470-272-0054";
              }
            );
        });
    });
  });
}
