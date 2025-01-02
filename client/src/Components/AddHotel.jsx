import React, { useState } from "react";
import { registerHotels } from "../actions/user.actions";

const AddHotel = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    <div className=" mx-auto mb-10 px-4 ">
      {showError && (
        <div className="mb-4 bg-red-500 text-white p-4 rounded">
          An error occurred while adding the hotel. Please try again.
        </div>
      )}
      {showSuccess && (
        <div className="mb-4 bg-white text-gray-800 p-4 rounded">
          Hotel added successfully!
        </div>
      )}
      <h2 className="text-center mb-6 text-white text-2xl">Add a New Hotel</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 bg-gray-800 p-6 rounded shadow-lg"
      >
        {/* Hotel Name */}
        <div>
          <label
            htmlFor="hotelName"
            className="block text-white font-medium mb-2"
          >
            Hotel Name
          </label>
          <input
            type="text"
            id="hotelName"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Logo */}
        <div>
          <label htmlFor="logo" className="block text-white font-medium mb-2">
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Address: Street */}
        <div>
          <label htmlFor="street" className="block text-white font-medium mb-2">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Address: City */}
        <div>
          <label htmlFor="city" className="block text-white font-medium mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Address: State */}
        <div>
          <label htmlFor="state" className="block text-white font-medium mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Address: Zip Code */}
        <div>
          <label
            htmlFor="zipCode"
            className="block text-white font-medium mb-2"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 text-white rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display QR Code if hotel is added */}
      {hotel?.qrCode && (
        <div className="text-center mt-6">
          <img
            src={hotel.qrCode}
            alt="Hotel QR Code"
            className="border-2 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default AddHotel;
