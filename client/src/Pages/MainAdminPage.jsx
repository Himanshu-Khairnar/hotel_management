import React, { useEffect, useState } from "react";
import RegisterHotelTable from "../Components/RegisterHotelTable";
import AddHotel from "../Components/AddHotel";
import { gethotels } from "../actions/user.actions.js";

const MainAdminPage = () => {

  return (
    <div className="min-vh-100 bg-dark text-white py-4">
      <div className="container">
        <AddHotel />
        <RegisterHotelTable />
      </div>
    </div>
  );
};

export default MainAdminPage;
