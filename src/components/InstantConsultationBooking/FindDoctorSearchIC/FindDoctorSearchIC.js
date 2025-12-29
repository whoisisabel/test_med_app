import React, { useState } from "react";
import "./FindDoctorSearchIC.css";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mui/material";

const initSpeciality = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Bone",
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(false);
  const specialities = initSpeciality;

  const navigate = useNavigate();
  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    setAnchorEl(null);
    navigate(`/instant-consultation?speciality=${speciality}`);
  };

  const handleOpen = (e) => {
    setDoctorResultHidden(false);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setDoctorResultHidden(true);
  };

  const handleSearch = () => {
    if (specialities.includes(searchDoctor)) {
      navigate(`/instant-consultation?speciality=${searchDoctor}`);
    } else {
      navigate(`/instant-consultation`);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor at your ease</h1>
        <div
          className="home-search-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onClick={(e) => handleOpen(e)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            <button className="search-button" onClick={() => handleSearch()}>
              Search
            </button>
            <Popover
              id={"id"}
              open={!doctorResultHidden}
              onClose={() => handleClose()}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {specialities.map((speciality) => (
                <button
                  className="search-doctor-result-item"
                  key={speciality}
                  onClick={() => handleDoctorSelect(speciality)}
                >
                  <span className="material-symbols-small">search</span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </button>
              ))}
            </Popover>
          </div>
          {error && <div>Search criteria not found</div>}
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
