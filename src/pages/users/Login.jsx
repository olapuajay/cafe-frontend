import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import logo from "../../assets/logo.png";
export default function Login() {
  const {user, setUser} = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="p-4 text-[#D7CCC8] space-y-4">
      <h2 className="text-center font-semibold text-2xl">Login</h2>
      <div className="max-w-md mx-auto bg-[#3E2723] p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <img src={logo} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-red-500 text-sm text-center">{error && error}</p>
          <label htmlFor="email" className="text-sm">Email Address</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <button type="submit" className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">LOGIN</button>
          <hr />
          <div className="flex justify-center items-center gap-2 text-sm">
            <p className="">Don't have an account?</p>
            <Link to="/register" className=" text-blue-400 underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
