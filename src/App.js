import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing_Page/LandingPage";
import SignUp from "./components/Sign_Up/Sign_Up";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Forgot_Password/Forgot_Password";
import Home from "./components/Home/Home";
import InstantConsultation from "./components/InstantConsultationBooking/InstantConsultation";
import Notification from "./components/Notifications/Notifications";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Reports from "./components/Reports/Reports";

function App() {
  return (
    <Router>
      <div className="blob-cont">
        <div className="blue blob"></div>
      </div>
      <div className="blob-cont">
        <div className="blue1 blob"></div>
      </div>
      <Notification>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign-up" element={<SignUp />} />
          <Route path="/Forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/instant-consultation"
            element={<InstantConsultation />}
          />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Notification>
    </Router>
  );
}

export default App;
