import React, { useEffect, useState } from "react";
import { getGuests, specificHotelsbyIds } from "../actions/user.actions";
import { useParams } from "react-router-dom";

const GuestForm = () => {
  const { hotel } = useParams();
  const [guest, setGuest] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false); // For status change modal
  const [newStatus, setNewStatus] = useState(""); 

  useEffect(() => {
   const guestData = async () => {
     try {
       const data = await getGuests();
       console.log("guests dta",data); // Check the format of this data
       setGuest(data);
     } catch (error) {
       console.error("Error fetching guest data", error);
     }
   };

   const hotelData = async () => {
     try {
       const hotelData = await specificHotelsbyIds(hotel);

       console.log(hotel); // Check the format of this data
       setHotels(hotelData);
     } catch (error) {
       console.error("Error fetching hotel data", error);
     }
   };

    guestData();
    hotelData();
  }, [hotel]);

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  const handleChangeStatus = (guest) => {
    setSelectedGuest(guest);
    setNewStatus(guest.status); // Set the current status as the initial value
    setShowStatusModal(true);
  };

  const handleSaveStatus = () => {
    // Call API or perform any other action to save the new status
    console.log("Status changed to:", newStatus);
    // Close the modal
    setShowStatusModal(false);
    // Optionally update the guest data here
  };
    const handlePrint = () => {
      // Create a new window for printing
      const printWindow = window.open("", "", "height=800,width=600");

      // Extract only the data to print
      const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Guest Details</h2>
        <p><strong>Full Name:</strong> ${selectedGuest.fullName}</p>
        <p><strong>Mobile:</strong> ${selectedGuest.mobileNumber}</p>
        <p><strong>Email:</strong> ${selectedGuest.emailId}</p>
        <p><strong>Purpose of Visit:</strong> ${
          selectedGuest.purposeOfVisit
        }</p>
        <p><strong>Status:</strong> ${selectedGuest.status}</p>
        <p><strong>ID Proof Number:</strong> ${selectedGuest.idProofNumber}</p>
        <p><strong>Address:</strong></p>
        <ul>
          <li><strong>Street:</strong> ${selectedGuest.address.street}</li>
          <li><strong>City:</strong> ${selectedGuest.address.city}</li>
          <li><strong>State:</strong> ${selectedGuest.address.state}</li>
          <li><strong>Zip Code:</strong> ${selectedGuest.address.zipCode}</li>
        </ul>
        <p><strong>Stay Dates:</strong></p>
        <ul>
          <li><strong>From:</strong> ${new Date(
            selectedGuest.stayDates.from
          ).toLocaleDateString()}</li>
          <li><strong>To:</strong> ${new Date(
            selectedGuest.stayDates.to
          ).toLocaleDateString()}</li>
        </ul>
      </div>
    `;

      // Write the content to the new window
      printWindow.document.write(printContent);
      printWindow.document.close(); // Close the document to apply changes

      // Trigger the print dialog
      printWindow.print();
    };

  return (
    <div className="container-fluid bg-dark text-white p-4 min-vh-100">
      {/* Navbar with hotel name and image */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* Display hotel image and name */}
            <div className="d-flex align-items-center">
              <img
                src={hotels?.logo?.url} // assuming first hotel for display
                alt={hotels.name}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                className="rounded-circle me-2"
              />
              <span>{hotels?.name}</span>
            </div>
          </a>
        </div>
      </nav>

      <h2 className="text-center mb-4">Guest List</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
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
                    style={{ cursor: "pointer" }}
                    onClick={() => handleChangeStatus(g)} // Open status change modal
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
                  <p>
                    <strong>Full Name:</strong> {selectedGuest.fullName}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {selectedGuest.mobileNumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedGuest.emailId}
                  </p>
                  <p>
                    <strong>Purpose of Visit:</strong>{" "}
                    {selectedGuest.purposeOfVisit}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedGuest.status}
                  </p>
                  <p>
                    <strong>ID Proof Number:</strong>{" "}
                    {selectedGuest.idProofNumber}
                  </p>
                  <p>
                    <strong>Address:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Street:</strong> {selectedGuest.address.street}
                    </li>
                    <li>
                      <strong>City:</strong> {selectedGuest.address.city}
                    </li>
                    <li>
                      <strong>State:</strong> {selectedGuest.address.state}
                    </li>
                    <li>
                      <strong>Zip Code:</strong> {selectedGuest.address.zipCode}
                    </li>
                  </ul>
                  <p>
                    <strong>Stay Dates:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>From:</strong>{" "}
                      {new Date(
                        selectedGuest.stayDates.from
                      ).toLocaleDateString()}
                    </li>
                    <li>
                      <strong>To:</strong>{" "}
                      {new Date(
                        selectedGuest.stayDates.to
                      ).toLocaleDateString()}
                    </li>
                  </ul>
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
              <button
                type="button"
                className="btn btn-info"
                onClick={handlePrint} // Trigger the print logic
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for changing status */}
      <div
        className={`modal fade ${showStatusModal ? "show" : ""}`}
        style={{ display: showStatusModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title">Change Status</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowStatusModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedGuest && (
                <div className="form-group">
                  <label className="text-white-50">Select New Status</label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Accept</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowStatusModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveStatus}
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
      {showStatusModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default GuestForm;
