import React from "react";

const RegisterHotelTable = ({ hotels, handleEdit, handleDelete }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Hotel List</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">Hotel Name</th>
            <th scope="col">Address</th>
            <th scope="col">Logo</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <tr key={index}>
                <td>{hotel.name}</td>
                <td>
                  {hotel.address.street}, {hotel.address.city},{" "}
                  {hotel.address.state} - {hotel.address.zipCode}
                </td>
                <td>
                  <img
                    src={URL.createObjectURL(hotel.logo)}
                    alt={`${hotel.name} logo`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Hotels Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterHotelTable;
