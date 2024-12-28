import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleGuest } from "../actions/user.actions";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

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
    const details = `
      Guest Details:
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Action Buttons */}
      
      <div className="d-flex justify-content-end gap-2 mb-4 d-print-none">
        
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
      </div>

      {/* Welcome Card */}
      <div className="card bg-dark text-white mb-4 border-0 shadow">
        <div className="card-body text-center p-4">
          <h1 className="card-title display-5 text-primary mb-3">
            Thank You for Registering!
          </h1>
          <p className="card-text lead">
            Dear <span className="fw-bold">{user.fullName}</span>, we appreciate
            your registration at our hotel. Enjoy your stay!
          </p>

          {/* QR Code Section */}
          {showQR && (
            <div className="mt-4 d-print-none">
              <div className="bg-white p-3 rounded d-inline-block">
                <img
                  src={getQRCode()}
                  alt="Guest QR Code"
                  className="img-fluid"
                />
              </div>
              <p className="text-muted mt-2">Scan for mobile pass</p>
            </div>
          )}
        </div>
      </div>

      {/* Guest Details Card */}
      <div className="card bg-dark text-white border-0 shadow">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Guest Details</h2>

          <div className="row g-4">
            {/* Details grid with hover effect */}
            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Full Name</h6>
                <p className="mb-0 fs-5">{user.fullName}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Email ID</h6>
                <p className="mb-0 fs-5">{user.emailId}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Mobile Number</h6>
                <p className="mb-0 fs-5">{user.mobileNumber}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">ID Proof Number</h6>
                <p className="mb-0 fs-5">{user.idProofNumber}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Purpose of Visit</h6>
                <p className="mb-0 fs-5">{user.purposeOfVisit}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Status</h6>
                <p className="mb-0 fs-5">{user.status}</p>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 bg-secondary rounded hover-effect">
                <h6 className="text-white-50 mb-2">Stay Dates</h6>
                <p className="mb-0 fs-5">
                  From {new Date(user.stayDates.from).toLocaleDateString()} to{" "}
                  {new Date(user.stayDates.to).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-secondary rounded text-center hover-effect">
            <h3 className="h5 text-white-50 mb-2">Address</h3>
            <p className="mb-0 fs-5">
              {user.address.street}, {user.address.city}, {user.address.state} -{" "}
              {user.address.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* styling while printing details*/}
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
          .hover-effect {
            transition: transform 0.2s ease-in-out;
          }
          .hover-effect:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default SingleUser;
