import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function MainNavbar({ showMenu = true, active }) {
  const [open, setOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    sessionStorage.clear();
    navigate("/Login");
  };

  useEffect(() => {
    const name = sessionStorage.getItem("email");
    if (name) {
      setUsername(name.split("@")[0]);
    } else {
      handleLogout();
    }
  }, []);

  return (
    <div className="navbar bg-white">
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
            <ul className="menu">
              <li>
                <a
                  href="/home"
                  className={active === "home" ? "active" : null}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/instant-consultation"
                  className={active === "appointment" ? "active" : null}
                >
                  Appointment
                </a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Reviews</a>
              </li>
            </ul>
            <div className="auth-buttons">
              <Avatar>
                <PersonIcon />
              </Avatar>
              <span>Hi, {userName}</span>
              <a href="/Login">
                <button className="login-btn" onClick={() => handleLogout()}>
                  Logout
                </button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
