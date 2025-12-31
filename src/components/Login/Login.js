import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../NavBar/NavBar";
import { API_URL } from "../../config";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) return;
    console.log("isFormValid:", isFormValid);

    const response = await fetch(`${API_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetails.email,
        password: userDetails.password,
      }),
    });

    const json = await response.json(); 

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", userDetails.email);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleReset();
        navigate("/Home");
      }, 3000);

    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setErrorMessage(error.msg);
        }
      } else {
        setErrorMessage(json.error);
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
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
              disabled={loading}
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
              disabled={loading}
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
            disabled={!isFormValid || loading}
          >
            {loading ? "Loading . . ." : "Login"}
          </button>
          <div className="links links-right">
            <a href="/Forgot-password">Forgot Password</a>
          </div>
        </form>

        {success && (
          <div className={errorMessage ? "error-popup" : "success-popup"}>
            {errorMessage ? errorMessage : "Account login successfull!"}
          </div>
        )}
      </div>
    </div>
  );
}
