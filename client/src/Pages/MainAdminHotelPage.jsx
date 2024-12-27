import React, { useEffect, useState } from "react";
import { specificHotelsbyIds } from "../actions/user.actions";
import { useParams } from "react-router-dom";

const MainAdminHotelPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await specificHotelsbyIds(hotelId);
        setHotel(res);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    getdata();
  }, [hotelId]);

  if (!hotel) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-vh-100 bg-black p-4">
      <div className="card bg-dark text-white border-secondary">
        <div className="card-header bg-black border-bottom border-secondary">
          <h2 className="text-center mb-0">Hotel Details</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h4 className="text-white-50">Hotel Name</h4>
            <p className="lead text-white">{hotel.name}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-white-50">Hotel Logo</h4>
            <img
              src={hotel.logo?.url}
              alt={`${hotel.name} Logo`}
              className="img-fluid rounded shadow-sm"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>

          <div className="mb-4">
            <h4 className="text-white-50">Address</h4>
            <p className="text-white">
              {hotel.address.street}, {hotel.address.city},{" "}
              {hotel.address.state} - {hotel.address.zipCode}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white-50">QR Code</h4>
            <img
              src={hotel.qrCode}
              alt="QR Code"
              className="img-fluid"
              style={{ width: "150px", height: "150px" }}
            />
          </div>

          <div>
            <h4 className="text-white-50">Created At</h4>
            <p className="text-white">
              {new Date(hotel.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdminHotelPage;
