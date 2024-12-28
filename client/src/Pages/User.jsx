import React, { useState } from "react";
import { postGuests } from "../actions/user.actions.js";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const nav = useNavigate();
  const { hotel } = useParams();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [formData, setFormData] = useState({
    hotelId: "",
    fullName: "",
    mobileNumber: "",
    city: "",
    street: "",
    zipCode: "",
    state: "",
    purposeOfVisit: "",
    from: "",
    to: "",
    emailId: "",
    idProofNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      formData.hotelId = hotel;
      console.log(formData.hotelId);
      alert("Form submitted successfully!");
      const data = await postGuests(formData);

      if (data) {
        setSubmissionStatus("success");

        setTimeout(() => setSubmissionStatus(false), 3000); // Hide it after 3 seconds

        setFormData({
          fullName: "",
          mobileNumber: "",
          emailId: "",
          idProofNumber: "",
          city: "",
          state: "",
          street: "",
          zipCode: "",
          purposeOfVisit: "",
          from: "",
          to: "",
        });
        nav(`/guest/${hotel}/user/${data.guest._id}`);
      }
    } catch (error) {
      submissionStatus("error");
    }
  };

  return (
    <div
      className=""
      style={{
        backgroundColor: "#121212", // Dark background for the form container
        color: "#fff", // White text for readability
        padding: "20px",
      }}
    >
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>
        Guest Registration Form
      </h2>

      {submissionStatus && (
        <div
          style={{
            backgroundColor:
              submissionStatus === "success" ? "#007BFF" : "#FF4444", // Blue for success, Red for error
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {submissionStatus === "success"
            ? "Thank you! Your form has been successfully submitted."
            : "Error! There was a problem submitting the form. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ color: "#fff" }}
          >
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#333", // Dark input fields
              color: "#fff", // White text inside input
              borderColor: "#555", // Lighter border for inputs
            }}
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-3">
          <label
            htmlFor="mobileNumber"
            className="form-label"
            style={{ color: "#fff" }}
          >
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#333", // Dark input fields
              color: "#fff", // White text inside input
              borderColor: "#555", // Lighter border for inputs
            }}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "#fff" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#333", // Dark input fields
              color: "#fff", // White text inside input
              borderColor: "#555", // Lighter border for inputs
            }}
          />
        </div>

        {/* ID Proof Number */}
        <div className="mb-3">
          <label
            htmlFor="idProofNumber"
            className="form-label"
            style={{ color: "#fff" }}
          >
            ID Proof Number
          </label>
          <input
            type="text"
            className="form-control"
            id="idProofNumber"
            name="idProofNumber"
            value={formData.idProofNumber}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#333", // Dark input fields
              color: "#fff", // White text inside input
              borderColor: "#555", // Lighter border for inputs
            }}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#fff" }}>
            Address
          </label>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#333", // Dark input fields
                  color: "#fff", // White text inside input
                  borderColor: "#555", // Lighter border for inputs
                }}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#333", // Dark input fields
                  color: "#fff", // White text inside input
                  borderColor: "#555", // Lighter border for inputs
                }}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#333", // Dark input fields
                  color: "#fff", // White text inside input
                  borderColor: "#555", // Lighter border for inputs
                }}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#333", // Dark input fields
                  color: "#fff", // White text inside input
                  borderColor: "#555", // Lighter border for inputs
                }}
              />
            </div>
          </div>
        </div>

        {/* Purpose of Visit */}
        <div className="mb-3">
          <label
            htmlFor="purposeOfVisit"
            className="form-label"
            style={{ color: "#fff" }}
          >
            Purpose of Visit
          </label>
          <select
            className="form-control"
            id="purposeOfVisit"
            name="purposeOfVisit"
            value={formData.purposeOfVisit}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#333", // Dark input fields
              color: "#fff", // White text inside input
              borderColor: "#555", // Lighter border for inputs
            }}
          >
            <option value="" disabled>
              Select Purpose
            </option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
            <option value="Tourist">Tourist</option>
          </select>
        </div>

        {/* Stay Dates */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label
              htmlFor="stayFrom"
              className="form-label"
              style={{ color: "#fff" }}
            >
              Stay From
            </label>
            <input
              type="date"
              className="form-control"
              id="stayFrom"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#333", // Dark input fields
                color: "#fff", // White text inside input
                borderColor: "#555", // Lighter border for inputs
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label
              htmlFor="stayTo"
              className="form-label"
              style={{ color: "#fff" }}
            >
              Stay To
            </label>
            <input
              type="date"
              className="form-control"
              id="stayTo"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#333", // Dark input fields
                color: "#fff", // White text inside input
                borderColor: "#555", // Lighter border for inputs
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-light"
          style={{
            backgroundColor: "#444", // Dark button color
            border: "none",
            color: "#fff", // White text on button
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;
