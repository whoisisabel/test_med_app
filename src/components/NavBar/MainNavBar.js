import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { Avatar, Popover } from "@mui/material";

export default function MainNavbar({ showMenu = true, active }) {
  const [open, setOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "user-popover" : undefined;
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
                <a href="/home" className={active === "home" ? "active" : null}>
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
                <a
                  href="/reviews"
                  className={active === "reviews" ? "active" : null}
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div className="auth-buttons">
              <button
                onClick={handleClick}
                className="avatar"
                aria-describedby={popoverId}
              >
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </button>
              <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="popover">
                  <a href="/profile">Profile</a>
                  <a href="/reports">Reports</a>
                </div>
              </Popover>
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
