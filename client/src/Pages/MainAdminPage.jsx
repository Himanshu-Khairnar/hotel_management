import React from "react";
import RegisterHotelTable from "../Components/RegisterHotelTable";
import AddHotel from "../Components/AddHotel";

const MainAdminPage = () => {
  return (
    <div className="bg-gray-800 ">
      <div className=" mx-auto px-4 py-6 mb-10">
       
          <AddHotel />
       
        <div>
          <RegisterHotelTable />
        </div>
      </div>
    </div>
  );
};

export default MainAdminPage;
