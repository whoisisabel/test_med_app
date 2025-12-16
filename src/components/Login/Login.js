import React, { useState } from "react";
import "./Login.css";
import Navbar from "../NavBar/NavBar";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  const validators = {
    email: (v) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Enter a valid email address"
        : "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validators[name]?.(value),
    }));
  };

  const handleReset = () => {
    setUserDetails({
      email: "",
      password: "",
    });
    setErrors({});
    setTouched({});
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.keys(validators).every((key) => userDetails[key]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      handleReset();
    }, 3000);
  };

  return (
    <div>
      <Navbar showMenu={false} />
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="links">
            <div>
              Don't have an account? <a href="/Sign-up">Sign up</a>
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={userDetails.email}
              onChange={handleChange}
            />
            {userDetails.email && touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your password"
              value={userDetails.password}
              onChange={handleChange}
            />
            <span
              className="material-symbols-outlined toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid}
          >
            Login
          </button>
          <div className="links links-right">
            <a href="/Forgot-password">Forgot Password</a>
          </div>
        </form>

        {success && (
          <div className="success-popup">Account login successfully!</div>
        )}
      </div>
    </div>
  );
}
