import React from "react";
import MainNavbar from "../NavBar/MainNavBar";
import "../Landing_Page/LandingPage.css";


export default function Home() {
  return (
    <div>
      <MainNavbar active={"home"} />
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
            <a href="/instant-consultation">
              <button className="button" style={{width: "auto"}}>Search for a Doctor</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
