import React from "react";
import "./LandingPage.css";
import Navbar from "../NavBar/NavBar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <section class="hero-section">
        <div>
          <div data-aos="fade-up" class="flex-hero">
            <h1>
              Your Health
              <br />
              <span class="text-gradient"> Our Responsibility </span>
            </h1>
            <div class="blob-cont">
              <div class="blue blob"></div>
            </div>
            <div class="blob-cont">
              <div class="blue1 blob"></div>
            </div>
            <h4>
              Access quality healthcare anytime, anywhere. Connect with trusted
              doctors, schedule appointments, and manage your health with ease.
            </h4>
            <a href="/Login">
              <button class="button">Get Started</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
