import React, { useState } from "react";
import MainNavbar from "../NavBar/MainNavBar";
import Footer from "../NavBar/Footer";
import { randomImages } from "../InstantConsultationBooking/randomImages";
import "./Reports.css";

const PAGE_SIZE = 3;

const APP_DOCTORS = [
  {
    name: "Dr. Michaella Smith",
    ratings: "⭐⭐⭐⭐⭐",
    experience: 40,
    speciality: "General Physician",
  },
  {
    name: "Dr. Denis Rave",
    ratings: "⭐⭐⭐⭐",
    experience: 24,
    speciality: "Dentist",
  },
  {
    name: "Dr. Patricia Wing",
    ratings: "⭐⭐⭐⭐⭐",
    experience: 11,
    speciality: "Bone",
  },
  {
    name: "Dr. Emily Clark",
    ratings: "⭐⭐⭐⭐⭐",
    experience: 11,
    speciality: "Gynecologist/Obstetrician",
  },

  {
    name: "Dr. Richard Pearson",
    ratings: "⭐⭐⭐",
    experience: 40,
    speciality: "General Physician",
  },
];

export default function Reports() {
  const [page, setPage] = useState(1);

  const doctors = APP_DOCTORS;

  const reports = [
    {
      name: "Dr. Michaella Smith",
      reportName: "Blood Test Report",
      date: "2024-06-12",
      fileUrl: "/reports/blood_test_report.pdf",
    },
    {
      name: "Dr. Denis Rave",
      reportName: "X-Ray Report",
      date: "2024-06-15",
      fileUrl: "/reports/xray_report.pdf",
    },
  ];

  const totalPages = Math.ceil(doctors.length / PAGE_SIZE);
  const paginated = doctors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getReportForDoctor = (doctorName) =>
    reports.find((r) => r.name === doctorName);

  return (
    <div>
      <MainNavbar active="reports" />

      <div className="reports-page">
        <center>
          <h1>My Medical Reports</h1>
          <h3>View or download reports shared by your doctor</h3>
        </center>

        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Report</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((doctor, index) => {
                const report = getReportForDoctor(doctor.name);
                const globalIndex = (page - 1) * PAGE_SIZE + index;

                return (
                  <tr key={doctor.name}>
                    <td className="doctor-info-reports">
                      <img
                        src={
                          randomImages[globalIndex % randomImages.length].image
                        }
                        alt="doctor"
                      />
                      <div>
                        <p className="doctor-name">{doctor.name}</p>
                        <p className="doctor-speciality">{doctor.speciality}</p>
                      </div>
                    </td>

                    <td className="reports-container">
                      {report ? (
                        <div className="reports-text">
                          <div>
                            <p className="reports-name">{report.reportName}</p>
                            <p className="reports-comment">
                              Date: {report.date}
                            </p>
                          </div>

                          <div>
                            <a
                              href={report.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="delete-btn-reports"
                            >
                              View
                            </a>
                            &nbsp;&nbsp;
                            <a
                              href={report.fileUrl}
                              download
                              className="delete-btn-reports"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="reports-comment">No report uploaded yet</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <div>
              <span>
                Page {page} of {totalPages}
              </span>
            </div>
            <div>
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ◀
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
