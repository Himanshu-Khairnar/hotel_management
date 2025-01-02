import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/user.actions";

const SignInPage = () => {
  const nav = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setShowError(true);
    } else {
      setShowError(false);
    }
    setValidated(true);

    const user = await login(formdata.username, formdata.password, "MainAdmin");
    !user && setShowError(true);

    user && nav(`/admindashboard/${user._id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-2">Welcome Back</h2>
        <h4 className="text-center text-lg font-semibold mb-4">Main Admin</h4>

        {showError && (
          <div
            className="bg-red-600 text-white p-3 rounded mb-4 text-center"
            role="alert"
          >
            Invalid username or password.
          </div>
        )}

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              value={formdata.username}
              onChange={(e) =>
                setFormdata({ ...formdata, username: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring focus:ring-gray-600 focus:outline-none border border-gray-600"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formdata.password}
              onChange={(e) =>
                setFormdata({ ...formdata, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring focus:ring-gray-600 focus:outline-none border border-gray-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-600 bg-gray-800 focus:ring-0"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Are you a GUEST ADMIN?{" "}
          <Link
            to="/signin/guestadmin"
            className="text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
