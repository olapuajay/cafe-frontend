import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: ''
  });
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      setForm({
        firstName: result.data.firstName || '',
        lastName: result.data.lastName || '',
        email: result.data.email || '',
        password: '',
      });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong');
    }
  };
  useEffect(() => {
    if (!user?.id) {
      Navigate("/");
    } else {
      fetchProfile();
    }
  }, [user]);


  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      const result = await axios.patch(url, form);
      fetchProfile();
      setMessage('Profile updated successfully');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen text-[#D7CCC8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-[#3E2723] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:p-8 p-4">
          <div className="flex justify-between items-center mb-8">  
            <h3 className="text-2xl font-bold text-[#D7CCC8]">My Profile</h3>
            <button onClick={logout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300">Logout</button>
          </div>
          {}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  value={form.firstName}
                  className="mt-1 block w-full bg-[#1E1E1E] border border-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-[#D7CCC8]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  value={form.lastName}
                  className="mt-1 block w-full bg-[#1E1E1E] border border-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-[#D7CCC8]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                value={form.email}
                className="mt-1 block w-full bg-[#1E1E1E] border border-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-[#D7CCC8]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                className="mt-1 block w-full bg-[#1E1E1E] border border-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-[#D7CCC8]"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
