import React, { useState } from "react";
import { registerHotels } from "../actions/user.actions";
import Alert from "react-bootstrap/Alert";

const AddHotel = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Success alert state
  const [hotel, setHotel] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.hotelName);
    data.append("logo", formData.logo);
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zipCode", formData.zipCode);

    try {
      const addHotel = await registerHotels(data);
      if (addHotel) {
        setHotel(addHotel);
        setShowSuccess(true);
        setShowError(false);
         setFormData({
           hotelName: "",
           logo: null,
           street: "",
           city: "",
           state: "",
           zipCode: "",
         });
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      {showError && (
        <Alert
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
          className="mb-4"
        >
          An error occurred while adding the hotel. Please try again.
        </Alert>
      )}
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
          className="mb-4"
        >
          Hotel added successfully!
        </Alert>
      )}
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

      {/* Display QR Code if hotel is added */}
      {hotel?.qrCode && (
        <div className="text-center mt-4">
          <img src={hotel.qrCode} alt="Hotel QR Code" />
        </div>
      )}
    </div>
  );
};

export default AddHotel;
