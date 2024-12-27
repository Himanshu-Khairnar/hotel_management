import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import MainAdminSignin from "./Pages/MainAdminSignin.jsx";
import MainAdminPage from "./Pages/MainAdminPage.jsx";
import GuestAdminSignin from "./Pages/GuestAdminSignin.jsx";
import GuestAdminPage from "./Pages/GuestAdminPage.jsx";
import User from "./Pages/User.jsx";
import GuestAdminPageForSingleGuest from "./Pages/GuestAdminPageForSingleGuest.jsx";
import MainAdminHotelPage from "./Pages/MainAdminHotelPage.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<MainAdminSignin />} />
          <Route path="/admindashboard/:id" element={<MainAdminPage />} />
          <Route path="/admindashboard/:id/hotel/:hotelId" element={<MainAdminHotelPage/>}/>
          <Route path="/signin/guestadmin" element={<GuestAdminSignin />} />
          <Route
            path="/dashboard/guestadmin/:id"
            element={<GuestAdminPage />}
          />
          <Route
            path="/dashboard/guestadmin/:id/guest/:guestId"
            element={<GuestAdminPageForSingleGuest />}
          />
          <Route path="/guest/:hotel" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App