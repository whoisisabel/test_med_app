import React, { useEffect, useState } from "react";
import MainNavbar from "../NavBar/MainNavBar";
import Footer from "../NavBar/Footer";
import { randomImages } from "../InstantConsultationBooking/randomImages";
import "./ReviewForm.css";

const PAGE_SIZE = 3;

export default function ReviewForm() {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [forms, setForms] = useState({});
  const [page, setPage] = useState(1);

  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const handleChange = (doctorName, field, value) => {
    setForms((prev) => ({
      ...prev,
      [doctorName]: {
        ...prev[doctorName],
        [field]: value,
        doctor: doctorName,
      },
    }));
  };

  const handleSubmit = (e, doctorName) => {
    e.preventDefault();
    const form = forms[doctorName];
    if (!form?.name || !form?.comment) return;

    setReviews((prev) => [...prev, { ...form, id: Date.now() }]);

    setForms((prev) => {
      const updated = { ...prev };
      delete updated[doctorName];
      return updated;
    });
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const totalPages = Math.ceil(doctors.length / PAGE_SIZE);
  const paginated = doctors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <MainNavbar active="reviews" />

      <div className="review-page">
        <center>
          <h1>Are you a happy client?</h1>
          <h3>Let us know what you loved or what could be improved</h3>
        </center>

        <div className="review-table-container">
          <table className="review-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Review</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((doctor, index) => {
                const review = reviews.find((r) => r.doctor === doctor.name);
                const form = forms[doctor.name] || {};
                const globalIndex = (page - 1) * PAGE_SIZE + index;

                return (
                  <tr key={doctor.name}>
                    <td className="doctor-info">
                      <img
                        src={
                          randomImages[globalIndex % randomImages.length].image
                        }
                        alt="doctor"
                      />
                      <div>
                        <p className="doctor-name">{doctor.name}</p>
                        <p className="doctor-speciality">{doctor.speciality}</p>
                        {review && (
                          <p className="doctor-rating">
                            {"★".repeat(Number(review.rating))}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="review-container">
                      {review ? (
                        <div className="review-text">
                          <div>
                            <p className="review-name">{review.name}</p>
                            <p className="review-comment">{review.comment}</p>
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() => deleteReview(review.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <form
                          className="review-form"
                          onSubmit={(e) => handleSubmit(e, doctor.name)}
                        >
                          <input
                            placeholder="Your name"
                            value={form.name || ""}
                            onChange={(e) =>
                              handleChange(doctor.name, "name", e.target.value)
                            }
                          />

                          <textarea
                            placeholder="Your comment"
                            value={form.comment || ""}
                            onChange={(e) =>
                              handleChange(
                                doctor.name,
                                "comment",
                                e.target.value
                              )
                            }
                          />

                          <input
                            type="number"
                            min="1"
                            max="5"
                            placeholder="Star rating (1–5)"
                            value={form.rating || ""}
                            onChange={(e) =>
                              handleChange(
                                doctor.name,
                                "rating",
                                e.target.value
                              )
                            }
                          />

                          <button type="submit">Submit Review</button>
                        </form>
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
