import React, { useState, useEffect } from "react";
import { gethotels } from "../actions/user.actions";

const RegisterHotelTable = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gethotels(); // Assuming gethotels fetches the data
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit hotel with id:", id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete hotel with id:", id);
    // Add delete logic here
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Hotel List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Hotel Name</th>
              <th scope="col">Logo</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td>{hotel.name}</td>
                  <td>
                    <img
                      src={hotel.logo?.url}
                      alt={`${hotel.name} logo`}
                      className="img-fluid rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(hotel._id)}
                      className="btn btn-warning btn-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No hotels available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterHotelTable;
