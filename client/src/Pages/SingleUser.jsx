import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleGuest } from "../actions/user.actions";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState(""); // Added copy message state

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSingleGuest(id);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [id]);

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setCopyMessage("URL copied to clipboard!"))
      .catch(() => setCopyMessage("Failed to copy URL."));
  };

  // Copy details to clipboard
  const copyDetails = () => {
    const details = `Guest Details:
      Full Name: ${user.fullName}
      Email: ${user.emailId}
      Mobile: ${user.mobileNumber}
      Stay Dates: ${new Date(
        user.stayDates.from
      ).toLocaleDateString()} to ${new Date(
      user.stayDates.to
    ).toLocaleDateString()}
      Address: ${user.address.street}, ${user.address.city}, ${
      user.address.state
    } - ${user.address.zipCode}
    `;
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate QR code URL for mobile pass
  const getQRCode = () => {
    const data = `${user.fullName}\n${user.emailId}\n${user.mobileNumber}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      data
    )}`;
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10 py-5">
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          className="btn btn-outline-light"
          onClick={() => setShowQR(!showQR)}
        >
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </button>

        <button className="btn btn-outline-primary" onClick={copyDetails}>
          {copied ? "Copied!" : "Copy Details"}
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          Print Details
        </button>

        {/* URL Copy Message */}
        {copyMessage && <span className="text-green-500">{copyMessage}</span>}
      </div>

      {/* Welcome Card */}
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-3">
            Thank You for Registering!
          </h1>
          <p className="text-lg">
            Dear <span className="font-bold">{user.fullName}</span>, we
            appreciate your registration at our hotel. Enjoy your stay!
          </p>

          {/* QR Code Section */}
          {showQR && (
            <div className="mt-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <img
                  src={getQRCode()}
                  alt="Guest QR Code"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-gray-400 mt-2">Scan for mobile pass</p>
            </div>
          )}
        </div>
      </div>

      {/* Guest Details Card */}
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Guest Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Details grid */}
          {[
            { label: "Full Name", value: user.fullName },
            { label: "Email ID", value: user.emailId },
            { label: "Mobile Number", value: user.mobileNumber },
            { label: "ID Proof Number", value: user.idProofNumber },
            { label: "Purpose of Visit", value: user.purposeOfVisit },
            { label: "Status", value: user.status },
            {
              label: "Stay Dates",
              value: `${new Date(
                user.stayDates.from
              ).toLocaleDateString()} to ${new Date(
                user.stayDates.to
              ).toLocaleDateString()}`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-gray-700 p-4 rounded-lg hover:shadow-lg"
            >
              <h6 className="text-gray-400 mb-2">{label}</h6>
              <p className="text-lg">{value}</p>
            </div>
          ))}

          {/* Address */}
          <div className="col-span-2 bg-gray-700 p-4 rounded-lg hover:shadow-lg">
            <h6 className="text-gray-400 mb-2">Address</h6>
            <p className="text-lg">
              {user.address.street}, {user.address.city}, {user.address.state} -{" "}
              {user.address.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Styling while printing details */}
      <style>
        {`
          @media print {
            body {
              background-color: white !important;
              color: black !important;
            }
            .card {
              border: 1px solid #ddd !important;
              background-color: white !important;
              color: black !important;
              box-shadow: none !important;
            }
            .bg-secondary {
              background-color: #f8f9fa !important;
              color: black !important;
            }
            .text-white-50 {
              color: #6c757d !important;
            }
            .text-white {
              color: black !important;
            }
            .d-print-none {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SingleUser;
