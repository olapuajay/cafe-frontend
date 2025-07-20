import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users`;
      const result = await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User added succesfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      ...form,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/${editId}`;
      const result = await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div className="flex flex-col md:p-6 p-2 text-white">
      <h2 className="text-[#D7CCC8] font-bold text-2xl">User Management</h2>
      {error}
      <div className="p-2 flex md:flex-row flex-col gap-8 rounded-lg shadow-lg">
        <form
          ref={frmRef}
          className="space-y-4 flex flex-col bg-[#3E2723] p-4 md:w-1/2 md:mx-auto rounded-lg shadow-lg"
        >
          <h1 className="text-[#D7CCC8] font-bold">Add User</h1>
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C]"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C]"
            required
          />
          <input
            name="email"
            value={form.email}
            type="text"
            placeholder="Email Address"
            onChange={handleChange}
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C]"
            required
          />
          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C]"
            required
          />
          <select
            name="role"
            value={form.role}
            required
            onChange={handleChange}
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C]"
          >
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {/* <input
            name="role"
            value={form.role}
            type="text"
            onChange={handleChange}
            placeholder="Role"
          /> */}
          {editId ? (
            <>
              <button
                onClick={handleUpdate}
                className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
            >
              ADD
            </button>
          )}
        </form>
        <div className="flex flex-col md:w-1/2 mx-auto">
          <div className="flex gap-2 items-center mb-4 w-full">
            <input
              type="text"
              placeholder="search for users..."
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
            />
            <button
              onClick={() => fetchUsers()}
              className="bg-[#FFB74D] py-2 px-4 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
            >
              Search
            </button>
          </div>
          <div>
            <div>
              <h3 className="text-[#D7CCC8] font-bold">User List</h3>
              <ul className="hidden md:block">
                {users.map((user) => (
                  <li key={user._id} className="border-b border-gray-700 py-2">
                    {user.firstName} {user.lastName} - {user.email} ({user.role}
                    )
                    <button
                      onClick={() => handleEdit(user)}
                      className="ml-4 text-[#FFB74D] hover:text-[#e68c32] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="md:hidden block">
                {users.map((user) => (
                  <li key={user._id} className="border-b border-gray-700 py-2">
                    <div>
                      {user.firstName} {user.lastName} - {user.email} (
                      {user.role})
                    </div>
                    <button
                      onClick={() => handleEdit(user)}
                      className="md:ml-4 text-[#FFB74D] hover:text-[#e68c32] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-[#FFB74D] p-1 rounded-full text-[#121212] cursor-pointer hover:bg-[#e68c32]"
            >
              <ChevronLeft />
            </button>
            <span className="text-[#D7CCC8] text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-[#FFB74D] p-1 rounded-full text-[#121212] cursor-pointer hover:bg-[#e68c32]"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
