import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import MainAdminSignin from "./Pages/MainAdminSignin";
import MainAdminPage from "./Pages/MainAdminPage";
import GuestAdminSignin from "./Pages/GuestAdminSignin";
import GuestAdminPage from "./Pages/GuestAdminPage";
import User from "./Pages/User";

export const App = () => {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainAdminSignin />}>
          <Route path="/admindashboard/:id" element={<MainAdminPage/>} />
          <Route path="/signin/guestadmin" element={<GuestAdminSignin />} />
          <Route path="/dashboard/guestadmin/:id" element={<GuestAdminPage/>} />
          <Route path="/guest/:hotel" element={<User/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
