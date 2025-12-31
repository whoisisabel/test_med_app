import React from "react";
import "./NavBar.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/instant-consultation">Appointment</a>
          </li>
           <li>
            <a href="/reviews">Reviews</a>
          </li>
        </ul>
        <p style={{color:"#151439"}}>Be sure to take a look at our Terms of Use and Privacy Policy</p>
        <p style={{color:"#0088FF"}}>© {new Date().getFullYear()} StayHealthy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
