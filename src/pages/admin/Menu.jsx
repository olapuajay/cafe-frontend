import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    imgUrl: "",
    featured: false,
  });
  const [editId, setEditId] = useState(null);
  const frmRef = useRef();

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(4);

  const API = import.meta.env.VITE_API_URL;

  const fetchMenus = async () => {
    try {
      setError("Loading...");
      const res = await axios.get(
        `${API}/api/menu?page=${page}&limit=${limit}&search=${searchVal}`
      );
      setMenus(res.data.result);
      setTotalPages(res.data.total || 1);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [page, searchVal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      if (editId) {
        await axios.patch(`${API}/api/menu/${editId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setError("Menu item updated successfully");
      } else {
        await axios.post(`${API}/api/menu`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setError("Menu item added successfully");
      }
      resetForm();
      fetchMenus();
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      category: "",
      subcategory: "",
      description: "",
      price: "",
      imgUrl: "",
      featured: false,
    });
  };

  const handleEdit = (menu) => {
    setEditId(menu._id);
    setForm(menu);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setError("Menu item deleted successfully");
      fetchMenus();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const filteredMenus =
    selectedCategory === "all"
      ? menus
      : menus.filter((m) => m.category === selectedCategory);

  return (
    <div className="flex flex-col text-white md:p-6 p-2">
      <h2 className="text-[#D7CCC8] font-bold text-2xl">Menu Management</h2>
      {error && <div className="mb-4 p-2 bg-[#3E2723] rounded">{error}</div>}
      <div className="flex justify-center my-4">
        <form ref={frmRef} className="md:w-md bg-[#3E2723] p-4 rounded-lg shadow-lg space-y-4">
          <h1 className="text-[#D7CCC8] font-bold">Add Menu Item</h1>
          <input
            name="name"
            value={form.name}
            type="text"
            placeholder="Name"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          >
            <option value="">Select Category</option>
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="cold_brews">Cold Brews</option>
            <option value="baked_items">Baked Items</option>
            <option value="savory_bites">Savory Bites</option>
            <option value="desserts">Desserts</option>
            <option value="healthy_picks">Healthy Picks</option>
          </select>
          <input
            name="subcategory"
            value={form.subcategory}
            type="text"
            placeholder="Subcategory"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
          />
          <label className="text-[#D7CCC8]">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="mr-1" />
            Featured
          </label>
          {editId ? (
            <>
              <button onClick={handleSubmit} className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] hover:bg-[#e68c32]">Update</button>
              <button onClick={resetForm} className="w-full bg-red-500 py-2 rounded-md text-[#121212] hover:bg-red-700">Cancel</button>
            </>
          ) : (
            <button onClick={handleSubmit} className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] hover:bg-[#e68c32]">Add</button>
          )}
        </form>
      </div>

      <div className="p-2 flex md:flex-row flex-col gap-8 rounded-lg shadow-lg justify-center items-center">
        <div className="flex flex-col justify-between items-center">
          <div className="flex gap-2 items-center mb-4">
            <input
              type="text"
              placeholder="search for menu items..."
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md w-full"
            />
            <button onClick={fetchMenus} className="bg-[#FFB74D] py-2 px-4 rounded-md text-[#121212] hover:bg-[#e68c32]">Search</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {["all", "coffee", "tea", "cold_brews", "baked_items", "savory_bites", "desserts", "healthy_picks"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border ${selectedCategory === cat ? 'bg-[#D7CCC8] text-black' : 'bg-transparent text-[#D7CCC8] border-[#D7CCC8]'}`}
              >
                {cat.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 md:p-4">
            {filteredMenus.map((menu) => (
              <div key={menu._id} className="bg-[#3E2723] p-4 flex flex-col rounded shadow-md">
                <img src={menu.imgUrl} alt={menu.name} className="h-42 w-full object-cover rounded" />
                <h3 className="text-[#D7CCC8] text-xl capitalize font-bold mt-2">{menu.name}</h3>
                <p className="text-[#D7CCC8]">{menu.description}</p>
                <h4 className="text-[#D7CCC8]">₹ {menu.price}</h4>
                {menu.featured && <p className="text-[#e68c32] font-semibold">⭐ Featured</p>}
                <div className="flex gap-4">
                  <button onClick={() => handleEdit(menu)} className="bg-[#FFB74D] py-1 px-2 mt-2 text-sm rounded hover:bg-[#e68c32] text-[#121212] font-bold">Edit</button>
                  <button onClick={() => handleDelete(menu._id)} className="bg-red-500 py-1 px-2 mt-2 text-sm rounded hover:bg-red-700 text-[#121212] font-bold">Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center mt-4 text-sm">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-[#FFB74D] p-1 rounded-full text-[#121212] hover:bg-[#e68c32]"
            >
              <ChevronLeft />
            </button>
            <span className="text-[#D7CCC8]">Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-[#FFB74D] p-1 rounded-full text-[#121212] hover:bg-[#e68c32]"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
