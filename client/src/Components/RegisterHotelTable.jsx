import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { gethotels } from "../actions/user.actions";
const RegisterHotelTable = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gethotels();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotel data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit hotel with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete hotel with id:", id);
  };

  return (
    <div className="container my-5 bg-dark text-white p-4 rounded">
      <h2 className="text-center mb-4">Hotel List</h2>
      {error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Hotel Name</th>
                <th scope="col">Logo</th>
                <th scope="col">Actions</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>{hotel.name || "No Name Available"}</td>
                    <td>
                      <img
                        src={hotel.logo?.url || "/placeholder-image.png"}
                        alt={`${hotel.name || "Hotel"} logo`}
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
                        className="btn btn-warning btn-sm me-2"
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
                    <td>
                      <Link
                        to={`/admindashboard/${id}/hotel/${hotel._id}`}
                        className="btn btn-info btn-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hotels available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisterHotelTable;
