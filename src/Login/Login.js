/* ELEMENTS */
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const form = document.getElementById("loginForm");
const successPopup = document.getElementById("successPopup");

/* PASSWORD TOGGLE */
togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "visibility" : "visibility_off";
});

/* EMAIL LIVE VALIDATION */
emailInput.addEventListener("input", () => {
  validateEmail();
});

/* FORM SUBMIT */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ALWAYS prevent submit first

  let isValid = true;

  if (!validateEmail()) isValid = false;

  /* SUCCESS */
  if (isValid) {
    successPopup.style.display = "block";

    setTimeout(() => {
      successPopup.style.display = "none";
      form.reset();
    }, 3000);
  }
});

/* HELPERS */
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    emailError.style.display = "block";
    emailInput.classList.add("input-error");
    return false;
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("input-error");
    return true;
  }
}
