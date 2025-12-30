import React from "react";
import { Alert, Snackbar } from "@mui/material";
import "./Notifications.css";

const Notification = ({ children }) => {
  const appointmentData = JSON.parse(localStorage.getItem("appointmentData"));

  return (
    <div>
      {children}
      {appointmentData &&
        appointmentData.map((appointment) => (
          <Snackbar open={appointmentData} className="notification" key={appointment.id}>
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
              <span>
                <strong>Appointment Booked!</strong>
              </span>
              <span>Doctor: <i>{appointment.doctorName}</i></span>
              <span>Speciality: <i>{appointment.doctorSpeciality}</i> </span>
              <span>Name:  <i>{appointment.name}</i></span>
              <span>Phone Number: <i>{appointment.phoneNumber}</i> </span>
              <span>Date of Appointment: <i>{appointment.appointmentDate} </i></span>
              <span>Time Slot: <i>{appointment.appointmentTime}</i> </span>
            </Alert>
          </Snackbar>
        ))}
    </div>
  );
};

export default Notification;
