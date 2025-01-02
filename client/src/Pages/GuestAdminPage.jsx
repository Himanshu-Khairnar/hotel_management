import React, { useEffect, useState } from "react";
import { getGuests, specificHotelsbyIds } from "../actions/user.actions";
import { useParams } from "react-router-dom";

const GuestForm = () => {
  const { hotel } = useParams();
  const [guest, setGuest] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const data = await getGuests();
        setGuest(data);
      } catch (error) {
        console.error("Error fetching guest data", error);
      }
    };

    const fetchHotelData = async () => {
      try {
        const hotelData = await specificHotelsbyIds(hotel);
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotel data", error);
      }
    };

    fetchGuestData();
    fetchHotelData();
  }, [hotel]);

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  const handleChangeStatus = (guest) => {
    setSelectedGuest(guest);
    setNewStatus(guest.status);
    setShowStatusModal(true);
  };

  const handleSaveStatus = () => {
    console.log("Status changed to:", newStatus);
    setShowStatusModal(false);
  };

 

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="flex items-center space-x-4 mb-8">
        <img
          src={hotels?.logo?.url}
          alt={hotels.name}
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-2xl font-bold">{hotels?.name}</h1>
      </header>

      <h2 className="text-center text-xl font-semibold mb-6">Guest List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Email</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guest.map((g) => (
              <tr key={g._id} className="border-t border-gray-700">
                <td className="p-4">{g.fullName}</td>
                <td className="p-4">{g.mobileNumber}</td>
                <td className="p-4">{g.emailId}</td>
                <td className="p-4">{g.purposeOfVisit}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      g.status === "Active" ? "bg-green-600" : "bg-red-600"
                    } cursor-pointer`}
                    onClick={() => handleChangeStatus(g)}
                  >
                    {g.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    className="px-4 py-2 bg-blue-600 rounded text-sm"
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

      {/* Modal for details */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-bold mb-4">Guest Details</h3>
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
              <strong>Purpose of Visit:</strong> {selectedGuest.purposeOfVisit}
            </p>
            <p>
              <strong>Status:</strong> {selectedGuest.status}
            </p>
            <p>
              <strong>ID Proof Number:</strong> {selectedGuest.idProofNumber}
            </p>
            <p>
              <strong>Stay from:</strong>{" "}
              {new Date(selectedGuest.stayDates.from).toLocaleDateString()}
            </p>
            <p>
              <strong>Stay from:</strong>{" "}
              {new Date(selectedGuest.stayDates.to).toLocaleDateString()}
            </p>

            <p>
              <strong>Submitted At:</strong>{" "}
              {new Date(selectedGuest.createdAt).toLocaleDateString()}
            </p>

            <div className="flex justify-between">
              <button
                className="mt-4 px-4 py-2 bg-blue-600 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="mt-4 px-4 py-2 bg-white text-blue-500 rounded"
                onClick={() => print()}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for changing status */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Change Status</h3>
            <select
              className="block w-full p-2 bg-gray-700 border border-gray-600 rounded"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 rounded"
              onClick={handleSaveStatus}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestForm;
