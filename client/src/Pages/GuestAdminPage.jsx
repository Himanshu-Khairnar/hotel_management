import React, { useEffect, useState } from "react";
import { getGuests } from "../actions/user.actions";

const GuestForm = () => {
  const [guest, setGuest] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const guestData = async () => {
      const data = await getGuests();
      setGuest(data);
    };
    guestData();
  }, []);

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  return (
    <div className="container-fluid bg-dark text-white p-4 min-vh-100">
      <h2 className="text-center mb-4">Guest List</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guest.map((g) => (
              <tr key={g._id}>
                <td>{g.fullName}</td>
                <td>{g.mobileNumber}</td>
                <td>{g.emailId}</td>
                <td>{g.purposeOfVisit}</td>
                <td>
                  <span
                    className={`badge ${
                      g.status === "Active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {g.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleShowDetails(g)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for detailed view */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title">Guest Details</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedGuest && (
                <div className="container">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-white-50">Full Name</h6>
                      <p>{selectedGuest.fullName}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-white-50">Mobile Number</h6>
                      <p>{selectedGuest.mobileNumber}</p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-white-50">Email</h6>
                      <p>{selectedGuest.emailId}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-white-50">Purpose of Visit</h6>
                      <p>{selectedGuest.purposeOfVisit}</p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <h6 className="text-white-50">Address</h6>
                      <p>
                        {selectedGuest.address.street},{" "}
                        {selectedGuest.address.city},<br />
                        {selectedGuest.address.state} -{" "}
                        {selectedGuest.address.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-white-50">Check-in Date</h6>
                      <p>
                        {new Date(
                          selectedGuest.stayDates.from
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-white-50">Check-out Date</h6>
                      <p>
                        {new Date(
                          selectedGuest.stayDates.to
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-white-50">ID Proof Number</h6>
                      <p>{selectedGuest.idProofNumber}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-white-50">Status</h6>
                      <span
                        className={`badge ${
                          selectedGuest.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {selectedGuest.status}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <h6 className="text-white-50">Created At</h6>
                      <p>
                        {new Date(selectedGuest.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default GuestForm;
