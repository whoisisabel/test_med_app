import React, { useState } from "react";

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      phoneNumber,
      doctorName,
      doctorSpeciality,
      appointmentDate,
      appointmentTime,
    });

    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setAppointmentTime("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={appointmentDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Time:</label>
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
