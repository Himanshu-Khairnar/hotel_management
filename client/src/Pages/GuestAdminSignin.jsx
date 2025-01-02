import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../actions/user.actions";

const SignInPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formdata.username || !formdata.password) {
      setShowError(true);
      return;
    }
    setValidated(true);
    setShowError(false);

    const user = await login(
      formdata.username,
      formdata.password,
      "GuestAdmin"
    );
    if (!user) {
      setShowError(true);
    } else {
      navigate(`/dashboard/guestadmin/${user._id}/hotel/${user.hotelId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <h4 className="text-lg font-medium text-center mb-6">Guest Admin</h4>

        {showError && (
          <div className="mb-4 p-3 bg-red-600 text-white text-sm rounded">
            Please fill out all required fields correctly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={formdata.username}
              onChange={(e) =>
                setFormdata({ ...formdata, username: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formdata.password}
              onChange={(e) =>
                setFormdata({ ...formdata, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500 border-gray-600"
              />
              <span className="ml-2">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm mt-4">
            Are you a MAIN ADMIN?{" "}
            <Link
              to="/"
              className="text-blue-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
