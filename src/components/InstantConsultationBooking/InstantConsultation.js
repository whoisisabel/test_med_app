import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";
import MainNavbar from "../NavBar/MainNavBar";
import Footer from "../NavBar/Footer";
import { randomImages } from "./randomImages";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        if (searchParams.get("speciality")) {
          // window.reload()
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() ===
              searchParams.get("speciality").toLowerCase()
          );

          setFilteredDoctors(filtered);

          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = (searchText) => {
    if (searchText === "") {
      setFilteredDoctors([]);
      setIsSearched(false);
      window.location.reload();
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilteredDoctors(filtered);
      setIsSearched(true);
      window.location.reload();
    }
  };

  const dataView = isSearched ? filteredDoctors : doctors;

  useEffect(() => {
    getDoctorsDetails();
  }, [searchParams]);

  return (
    <div>
      <MainNavbar active={"appointment"} />
      <div className="content">
        <div className="searchpage-container">
          <FindDoctorSearchIC onSearch={handleSearch} />
          <div className="search-results-container">
            <center>
              <h2>
                {dataView.length} doctors are available{" "}
                {searchParams.get("location")}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>
              {dataView.length > 0 ? (
                dataView.map((doctor, index) => (
                  <DoctorCardIC
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                    profilePic={randomImages[index]}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstantConsultation;
