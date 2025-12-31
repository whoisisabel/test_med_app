import React, { useState } from "react";
import "./NavBar.css";

export default function Navbar({ showMenu = true }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <a href="/">
        <div className="logo">
          StayHealthy
          <span className="material-symbols-outlined">home_health</span>
        </div>
      </a>
      {showMenu && (
        <>
          {" "}
          <div
            className="hamburger"
            id="hamburger"
            onClick={() => setOpen(!open)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div
            className={open ? "right-section active" : "right-section"}
            id="menu"
          >
            <div className="auth-buttons">
              <a href="/Sign-up">
                <button className="signup-btn">Register</button>
              </a>
              <a href="/Login">
                <button className="login-btn">Login</button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
