import React, { useState } from "react";
import "./Forgot_Password.css";
import Navbar from "../NavBar/NavBar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState();
  const [success, setSuccess] = useState(false);

  const validators = {
    email: (v) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Enter a valid email address"
        : "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmail(value);

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validators[name]?.(value),
    }));
  };

  const handleReset = () => {
    setEmail("");
    setErrors({});
    setTouched({});
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.keys(validators).every((key) => key);

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
          <h2>Forgot Password</h2>

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
              value={email}
              onChange={handleChange}
            />
            {email && touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid}
          >
            Login
          </button>
          <div className="links links-right">
            <a href="/Login">Back to Login</a>
          </div>
        </form>

        {success && (
          <div className="success-popup">
            Password reset instructions sent to your email
          </div>
        )}
      </div>
    </div>
  );
}
