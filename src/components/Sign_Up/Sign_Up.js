import React, { useState, useRef, useEffect } from "react";
import "./Sign_Up.css";
import Navbar from "../NavBar/NavBar";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    role: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  const selectRef = useRef(null);

  const roles = ["Doctor", "Admin", "Patient"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validators = {
    role: (v) => (!v ? "Please select a role" : ""),
    name: (v) => (!v || v.trim().length < 5 ? "Enter your full name" : ""),
    phoneNumber: (v) =>
      !/^\d{10}$/.test(v) ? "Phone number must be 10 digits" : "",
    email: (v) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Enter a valid email address"
        : "",
    password: (v) =>
      v.length < 12 ? "Password must be at least 12 characters" : "",
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

  const handleSelectRole = (role) => {
    setUserDetails((prev) => ({ ...prev, role }));
    setTouched((prev) => ({ ...prev, role: true }));
    setErrors((prev) => ({ ...prev, role: "" }));
    setSelectOpen(false);
  };

  const handleReset = () => {
    setUserDetails({
      role: "",
      name: "",
      email: "",
      phoneNumber: "",
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
      <div className="login-container signup-container">
        <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
          <h2>Sign Up</h2>

          <div className="links">
            <div>
              Already have an account? <a href="/Login">Login</a>
            </div>
          </div>

          <div className="input-group">
            <label>Role</label>
            <div
              ref={selectRef}
              className={`custom-select ${selectOpen ? "open" : ""}`}
              onClick={() => setSelectOpen(!selectOpen)}
            >
              <div className="selected">
                {userDetails.role || "Select role"}
              </div>
              <ul className="options">
                {roles.map((role) => (
                  <li key={role} onClick={() => handleSelectRole(role)}>
                    {role}
                  </li>
                ))}
              </ul>
              <span className="material-symbols-outlined toggle-select">
                keyboard_arrow_down
              </span>
            </div>
            {touched.role && errors.role && (
              <span className="error-message">{errors.role}</span>
            )}
          </div>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={userDetails.name}
              onChange={handleChange}
            />
            {userDetails.name && touched.name && errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="display-flex">
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                maxLength="10"
                placeholder="Your phone number"
                value={userDetails.phoneNumber}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "phoneNumber",
                      value: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
              />
              {userDetails.phoneNumber &&
                touched.phoneNumber &&
                errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
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
            {userDetails.password && touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid}
          >
            Sign Up
          </button>

          <div className="links links-center">
            <button type="button" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </form>

        {success && (
          <div className="success-popup">Account created successfully!</div>
        )}
      </div>
    </div>
  );
}
