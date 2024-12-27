import React, { useEffect, useState } from "react";
import RegisterHotelTable from "../Components/RegisterHotelTable";
import AddHotel from "../Components/AddHotel";
import { gethotels } from "../actions/user.actions.js";

const MainAdminPage = () => {
  const [hotels, setHotels] = useState([null]);

  useEffect(() => {
    const getdata = async () => {
      const data = await gethotels();

      setHotels(data);
    };

    getdata()
  },[]);


  return (
    <div className="h-100">
      <AddHotel />
      <RegisterHotelTable
       
      />  
    </div>
  );
};

export default MainAdminPage;
