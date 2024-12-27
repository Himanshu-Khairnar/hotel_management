import React, { useState } from "react";

const AddHotel = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    logo: null,
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hotel Form</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {/* Hotel Name */}
        <div className="col-md-6">
          <label htmlFor="hotelName" className="form-label">
            Hotel Name
          </label>
          <input
            type="text"
            className="form-control"
            id="hotelName"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Logo */}
        <div className="col-md-6">
          <label htmlFor="logo" className="form-label">
            Logo
          </label>
          <input
            type="file"
            className="form-control"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Address: Street */}
        <div className="col-12">
          <label htmlFor="street" className="form-label">
            Street
          </label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address: City */}
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address: State */}
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address: Zip Code */}
        <div className="col-md-2">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
