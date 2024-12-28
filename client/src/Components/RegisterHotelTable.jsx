import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteHotel, gethotels, updateHotel } from "../actions/user.actions";

const RegisterHotelTable = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    updatename: "",
    newStreet: "",
    newCity: "",
    newState: "",
    newCode: "",
    id: id,
  });

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

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setEditFormData({
      updatename: hotel.name,
      newStreet: hotel.address.street,
      newState: hotel.address.state,
      newCity: hotel.address.city,
      newCode: hotel.address.zipCode,
    });
    setShowEditModal(true);
  };

  const handleDelete = (hotel) => {
    setSelectedHotel(hotel);
    
    setShowDeleteModal(true);
  };

  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setShowViewModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    editFormData.id=id
    console.log("Edit submitted:", editFormData);
    const data = await updateHotel(
      editFormData
    );
    console.log(data);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async() => {
    console.log("Delete confirmed:", selectedHotel._id);
    const data = await deleteHotel(selectedHotel._id);
    data && location.reload()
    setShowDeleteModal(false);
  };

  return (
    <div className="container my-5 bg-dark text-white p-4 rounded shadow">
      <h2 className="text-center mb-4">Hotel List</h2>
      {error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center p-5">
          <h4>No hotels found</h4>
          <p>Add hotels to display them here.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Hotel Name</th>
                <th scope="col">Logo</th>
                <th scope="col">Actions</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel._id} className="align-middle">
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
                      onClick={() => handleEdit(hotel)}
                      className="btn btn-sm btn-outline-warning me-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                    >
                      <i className="bi bi-pencil">Edit</i>
                    </button>
                    <button
                      onClick={() => handleDelete(hotel)}
                      className="btn btn-sm btn-outline-danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                    >
                      <i className="bi bi-trash">Delete</i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleView(hotel)}
                      className="btn btn-sm btn-outline-info"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="View"
                    >
                      <i className="bi bi-eye">View</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Edit Hotel</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="editName"
                      value={editFormData.updatename}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          updatename: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>

                  {/* Address Inputs */}
                  <div className="mb-3">
                    <label htmlFor="editStreet" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      id="editStreet"
                      value={editFormData.newStreet}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          newStreet: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      id="editCity"
                      value={editFormData.newCity}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,

                          newCity: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editState" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      id="editState"
                      value={editFormData.newState}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          newState: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editZipCode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="editZipCode"
                      value={editFormData.newCode}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          newCode: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {selectedHotel.name}?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Hotel Details</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedHotel.name}
                </p>
                <p>
                  <strong>Logo:</strong>
                </p>
                <img
                  src={selectedHotel.logo?.url || "/placeholder-image.png"}
                  alt={`${selectedHotel.name} logo`}
                  className="img-fluid mb-3"
                />
                <p>
                  <strong>Address:</strong>
                  <br />
                  {selectedHotel.address?.street}, {selectedHotel.address?.city}
                  , {selectedHotel.address?.state} -{" "}
                  {selectedHotel.address?.zipCode}
                </p>
                <p>
                  <strong>QR Code:</strong>
                </p>
                <img
                  src={selectedHotel.qrCode || "/placeholder-qr.png"}
                  alt="QR Code"
                  className="img-fluid mb-3"
                />
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedHotel.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterHotelTable;
