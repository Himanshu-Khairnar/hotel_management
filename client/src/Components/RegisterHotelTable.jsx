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
    editFormData.id = id;
    console.log("Edit submitted:", editFormData);
    const data = await updateHotel(editFormData);
    console.log(data);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async () => {
    console.log("Delete confirmed:", selectedHotel._id);
    const data = await deleteHotel(selectedHotel._id);
    data && location.reload();
    setShowDeleteModal(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Hotel List</h2>

      {error ? (
        <div className="bg-red-500 text-center py-3 rounded mb-4">{error}</div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-10">
          <h4 className="text-lg">No hotels found</h4>
          <p>Add hotels to display them here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-lg">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="px-4 py-2">Hotel Name</th>
                <th className="px-4 py-2">Logo</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">
                    {hotel.name || "No Name Available"}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={hotel.logo?.url || "/placeholder-image.png"}
                      alt={`${hotel.name || "Hotel"} logo`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleView(hotel)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Edit Hotel</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={editFormData.updatename}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      updatename: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Street</label>
                <input
                  type="text"
                  value={editFormData.newStreet}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      newStreet: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={editFormData.newCity}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      newCity: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  value={editFormData.newState}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      newState: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={editFormData.newCode}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      newCode: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg max-w-sm w-full">
            <div className="px-4 py-3 border-b border-gray-700">
              <h5 className="text-lg font-semibold">Confirm Delete</h5>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowDeleteModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-3">
              <p>Are you sure you want to delete {selectedHotel.name}?</p>
            </div>
            <div className="flex justify-end space-x-2 px-4 py-3 border-t border-gray-700">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
                onClick={handleDeleteConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg max-w-lg w-full">
            <div className="px-4 py-3 border-b border-gray-700">
              <h5 className="text-lg font-semibold">Hotel Details</h5>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowViewModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-3 space-y-4">
              <p>
                <strong>Name:</strong> {selectedHotel.name}
              </p>
              <p>
                <strong>Logo:</strong>
              </p>
              <img
                src={selectedHotel.logo?.url || "/placeholder-image.png"}
                alt={`${selectedHotel.name} logo`}
              className="w-[5rem] h-[5rem] rounded"
              />
              <p>
                <strong>Address:</strong>
                <br />
                {selectedHotel.address?.street}, {selectedHotel.address?.city},{" "}
                {selectedHotel.address?.state} -{" "}
                {selectedHotel.address?.zipCode}
              </p>
              <p>
                <strong>QR Code:</strong>
              </p>
              <img
                src={selectedHotel.qrCode || "/placeholder-qr.png"}
                alt="QR Code"
                className="h-[5rem] rounded"
              />
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedHotel.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-700">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterHotelTable;
