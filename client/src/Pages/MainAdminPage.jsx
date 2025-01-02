import React from "react";
import RegisterHotelTable from "../Components/RegisterHotelTable";
import AddHotel from "../Components/AddHotel";

const MainAdminPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <AddHotel />
        </div>
        <div>
          <RegisterHotelTable />
        </div>
      </div>
    </div>
  );
};

export default MainAdminPage;
