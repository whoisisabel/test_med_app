import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../NavBar/MainNavBar";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (!token) navigate("/login");
    else fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Email: email,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const user = await response.json();
      setUserDetails(user);
      setUpdatedDetails(user);
      setLoading(false);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) throw new Error("Update failed");

      setUserDetails(updatedDetails);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <>
        <MainNavbar />
        <div className="profile-container">Loading...</div>
      </>
    );
  }

  return (
    <div>
      <MainNavbar />

      <div className="profile-container">
        <div className="profile-card">
          <h2>My Profile</h2>

          {editMode ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <label>
                Name
                <input
                  name="name"
                  value={updatedDetails.name || ""}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Phone
                <input
                  name="phone"
                  value={updatedDetails.phone || ""}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Email
                <input value={userDetails.email} disabled />
              </label>

              <div className="profile-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setUpdatedDetails(userDetails);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {userDetails.phone || "-"}
              </p>

              <div>
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
