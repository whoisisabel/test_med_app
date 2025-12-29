import React from "react";
import "./LandingPage.css";
import Navbar from "../NavBar/NavBar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">
            <h1>
              Your Health
              <br />
              <span className="text-gradient"> Our Responsibility </span>
            </h1>
            <div className="blob-cont">
              <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
              <div className="blue1 blob"></div>
            </div>
            <h4>
              Access quality healthcare anytime, anywhere. Connect with trusted
              doctors, schedule appointments, and manage your health with ease.
            </h4>
            <a href="/Login">
              <button className="button">Get Started</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
