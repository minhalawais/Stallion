import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://stallionsls.com/api/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Check if user is admin and redirect accordingly
        if (response.data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/booking');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Invalid email or password');
      } else if (error.request) {
        setError('Cannot connect to server. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center px-7 h-screen bg-white -mt-10">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 bg-white border shadow-lg hover:scale-105 transition-all transform shadow-slate-500 rounded">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl text-black font-bold sm:text-3xl">LOGIN</h1>
            <p className="mt-4 text-black">
              Provide Your Login Credentials To Move Forward
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded text-black focus:outline-none border-2 border-slate-300 focus:bg-zinc-100 shadow-slate-400 bg-white p-4 pe-12 text-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full rounded text-black border-2 border-slate-300 shadow-slate-400 focus:bg-zinc-100 focus:outline-none bg-white p-4 pe-12 text-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-black hover:bg-slate-600 hover:scale-105 w-full text-white font-bold py-2 px-10 transition duration-300 rounded ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
              <p className="text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="hover:underline underline text-black font-bold cursor-pointer"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;