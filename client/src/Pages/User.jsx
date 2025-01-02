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
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Guest Registration Form
      </h2>

      {submissionStatus && (
        <div
          className={`text-white p-4 text-center mb-6 rounded-lg ${
            submissionStatus === "success" ? "bg-blue-600" : "bg-red-600"
          }`}
        >
          {submissionStatus === "success"
            ? "Thank you! Your form has been successfully submitted."
            : "Error! There was a problem submitting the form. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* ID Proof Number */}
        <div className="mb-4">
          <label htmlFor="idProofNumber" className="block text-sm font-medium">
            ID Proof Number
          </label>
          <input
            type="text"
            id="idProofNumber"
            name="idProofNumber"
            value={formData.idProofNumber}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Purpose of Visit */}
        <div className="mb-4">
          <label htmlFor="purposeOfVisit" className="block text-sm font-medium">
            Purpose of Visit
          </label>
          <select
            id="purposeOfVisit"
            name="purposeOfVisit"
            value={formData.purposeOfVisit}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="stayFrom" className="block text-sm font-medium">
              Stay From
            </label>
            <input
              type="date"
              id="stayFrom"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="stayTo" className="block text-sm font-medium">
              Stay To
            </label>
            <input
              type="date"
              id="stayTo"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;
