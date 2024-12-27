import React, { useState } from "react";

const GuestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    idProofNumber: "",
    address: {
      city: "",
      state: "",
      street: "",
      zipCode: "",
    },
    purposeOfVisit: "",
    stayFrom: "",
    stayTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      idProofNumber: "",
      address: {
        city: "",
        state: "",
        street: "",
        zipCode: "",
      },
      purposeOfVisit: "",
      stayFrom: "",
      stayTo: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Guest Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
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
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* ID Proof Number */}
        <div className="mb-3">
          <label htmlFor="idProofNumber" className="form-label">
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
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Street"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="State"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Zip Code"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Purpose of Visit */}
        <div className="mb-3">
          <label htmlFor="purposeOfVisit" className="form-label">
            Purpose of Visit
          </label>
          <select
            className="form-control"
            id="purposeOfVisit"
            name="purposeOfVisit"
            value={formData.purposeOfVisit}
            onChange={handleChange}
            required
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
            <label htmlFor="stayFrom" className="form-label">
              Stay From
            </label>
            <input
              type="date"
              className="form-control"
              id="stayFrom"
              name="stayFrom"
              value={formData.stayFrom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="stayTo" className="form-label">
              Stay To
            </label>
            <input
              type="date"
              className="form-control"
              id="stayTo"
              name="stayTo"
              value={formData.stayTo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
