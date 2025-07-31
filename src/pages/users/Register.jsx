// import { useRef } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Data saved successfully");
      Navigate("/login")
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="p-4 text-[#D7CCC8] space-y-4">
      <h2 className="text-center font-semibold text-2xl">Register</h2>
      <div className="max-w-md mx-auto bg-[#3E2723] p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <img src={logo} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-red-500 text-sm text-center">{error && error}</p>
          <label htmlFor="firstName" className="text-sm">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="Enter First Name"
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <label htmlFor="lastName" className="text-sm">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <label htmlFor="email" className="text-sm">Email Address</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full mt-2 p-2 rounded-md bg-[#1E1E1E] border border-[#3E2723] text-[#D7CCC8] focus:outline-none focus:border-[#D7CCC8]"
          />
          <button type="submit" className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">CREATE ACCOUNT</button>
          <hr />
          <div className="flex justify-center items-center gap-2 text-sm">
            <p className="">Already a member?</p>
            <Link to="/login" className=" text-blue-400 underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}