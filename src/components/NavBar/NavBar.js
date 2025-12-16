import React, { useState } from "react";
import "./NavBar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <a href="LandingPage.html">
        <div className="logo">
          StayHealthy
          <span className="material-symbols-outlined">home_health</span>
        </div>
      </a>
      <div className="hamburger" id="hamburger" onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className={open ? "right-section active" : "right-section"}
        id="menu"
      >
        <ul className="menu">
          <li>
            <a href="LandingPage.html" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">Appointment</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Reviews</a>
          </li>
        </ul>
        <div className="auth-buttons">
          <a href="../Sign_Up/index.html">
            <button className="signup-btn">Register</button>
          </a>
          <a href="../Login/index.html">
            <button className="login-btn">Login</button>
          </a>
        </div>
      </div>
    </div>
  );
}
