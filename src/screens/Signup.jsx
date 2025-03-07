import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://stallionsls.com/api/auth/signup", {
        firstname,
        lastname,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Signup failed. Please try again.");
      }
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form 
        className="w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <div
          className="bg-white shadow-lg hover:scale-105 transition-all transform rounded-xl p-8 space-y-6"
        >
          <h2 className="text-black text-3xl text-center font-bold mb-6">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstname"
                className="w-full text-sm p-3 rounded border-2 border-slate-300 shadow-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                  placeholder:text-gray-400 transition-colors"
                type="text"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastname"
                className="w-full text-sm p-3 rounded border-2 border-slate-300 shadow-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                  placeholder:text-gray-400 transition-colors"
                type="text"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              className="w-full text-sm p-3 rounded border-2 border-slate-300 shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                placeholder:text-gray-400 transition-colors"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="w-full text-sm p-3 rounded border-2 border-slate-300 shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                    placeholder:text-gray-400 transition-colors"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  className="w-full text-sm p-3 rounded border-2 border-slate-300 shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                    placeholder:text-gray-400 transition-colors"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full p-3 bg-black text-white rounded-lg font-bold
              hover:bg-slate-800 transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-black hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;