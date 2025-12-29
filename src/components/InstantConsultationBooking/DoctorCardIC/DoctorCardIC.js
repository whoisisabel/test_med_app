import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 8.5,
  borderRadius: 4,
};

const DoctorCardIC = ({
  name,
  speciality,
  experience,
  ratings,
  profilePic,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-detail-speciality">{speciality}</div>
      <div className="doctor-card-detail-name">{name}</div>
      <div className="doctor-card-container">
        <div className="doctor-card-details-container">
          <div className="doctor-card-profile-image-container">
            <img
              src={profilePic.image}
              alt="Doctor"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "7px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="doctor-card-details">
        <div className="doctor-card-detail-experience">{experience} years</div>
        <button
          className="text-button"
          style={appointments.length > 0 ? { color: "red" } : null}
          onClick={() => handleBooking()}
        >
          {appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
        </button>
      </div>
      <div className="doctor-card-options-container">
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="doctorbg" style={{ background: "white" }}>
              <div className="doctor-card-container-modal ">
                <div className="doctor-card-details-container">
                  <div className="doctor-card-profile-image-container">
                    <img
                      src={profilePic.image}
                      alt="Doctor"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "7px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: "60%" }}>
                <div className="doctor-card-detail-speciality">
                  {speciality}
                </div>
                <div
                  className="doctor-card-detail-name"
                  style={{ fontSize: "28px", marginBottom: "5px" }}
                >
                  {name}
                </div>
                <div className="doctor-card-detail-consultationfees">
                  {ratings}
                </div>
                {appointments.length > 0 ? (
                  <>
                    <h3 style={{ marginTop: "20px" }}>Appointment Booked!</h3>
                    {appointments.map((appointment) => (
                      <div className="bookedInfo" key={appointment.id}>
                        <p>Name: {appointment.name}</p>
                        <p>Phone Number: {appointment.phoneNumber}</p>
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          style={{ background: "red", margin: "20px 0" }}
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <AppointmentFormIC
                    doctorName={name}
                    doctorSpeciality={speciality}
                    onSubmit={handleFormSubmit}
                  />
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DoctorCardIC;
