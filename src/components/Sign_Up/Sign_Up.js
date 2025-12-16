const form = document.getElementById("signupForm");
const successPopup = document.getElementById("successPopup");

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const toggleSelect = document.getElementById("toggleSelect");
const customSelect = document.querySelector(".custom-select");
const selected = document.getElementById("selectedRole");
const options = document.getElementById("roleOptions");
const roleInput = document.getElementById("role");

/* PASSWORD TOGGLE */
togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "visibility" : "visibility_off";
});

/* CUSTOM SELECT */
toggleSelect.addEventListener("click", () => {
  customSelect.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
  }
});

selected.addEventListener("click", () => {
  customSelect.classList.toggle("open");
});

options.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
    roleInput.value = option.dataset.value;
    customSelect.classList.remove("open");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  function toggleError(input, errorId, condition) {
    const error = document.getElementById(errorId);
    if (condition) {
      error.style.display = "block";
      input.classList.add("input-error");
      isValid = false;
    } else {
      error.style.display = "none";
      input.classList.remove("input-error");
    }
  }

  // ROLE
  toggleError(roleInput, "roleError", !roleInput.value);

  // NAME
  const name = document.getElementById("name");
  toggleError(name, "nameError", name.value.trim().length < 5);

  // PHONE
  const phone = document.getElementById("phone");
  toggleError(phone, "phoneError", !/^\+?[0-9\s-]{7,15}$/.test(phone.value));

  // EMAIL
  const email = document.getElementById("email");
  toggleError(
    email,
    "emailError",
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  );

  // PASSWORD
  toggleError(passwordInput, "passwordError", passwordInput.value.length < 12);

  /* ✅ SUCCESS */
  if (isValid) {
    successPopup.style.display = "block";

    setTimeout(() => {
      successPopup.style.display = "none";
      form.reset();
      selected.textContent = "Select role";
      roleInput.value = "";
    }, 3000);
  }
});
