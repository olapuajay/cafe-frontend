import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(4);
  const [editId, setEditId] = useState();
  const [selectedCategory, setSelectedcategory] = useState("all");

  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page, searchVal]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      const result = await axios.delete(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setError("Product Deleted Successfully");
      fetchProducts();
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
      const url = `${API_URL}/api/products`;
      const result = await axios.post(url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setError("Product added succesfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
      category: product.category,
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
      const url = `${API_URL}/api/products/${editId}`;
      const result = await axios.patch(url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
      setEditId(null);
      resetForm();
      setError("Product updated successfully");
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
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
      category: "",
    });
  };

  const filteredProducts = selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory);
  
  return (
    <div className="flex flex-col text-white md:p-6 p-2">
      <h2 className="text-[#D7CCC8] font-bold text-2xl">Product Management</h2>
      {error && <div className="mb-4 p-2 bg-[#3E2723] rounded">{error}</div>}
      <div className="flex justify-center my-4">
        <form ref={frmRef} className="md:w-md bg-[#3E2723] p-4 rounded-lg shadow-lg space-y-4">
          <h1 className="text-[#D7CCC8] font-bold">Add Product</h1>
          <input
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
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
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image Url"
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full"
          />
          {editId ? (
            <>
              <button onClick={handleUpdate} className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">Update</button>
              <button onClick={handleCancel} className="w-full bg-red-500 py-2 rounded-md text-[#121212] cursor-pointer hover:bg-red-700">Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} className="w-full bg-[#FFB74D] py-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">Add</button>
          )}
        </form>
      </div>
      <div className="p-2 flex md:flex-row flex-col gap-8 rounded-lg shadow-lg justify-center items-center">
        <div className="flex flex-col justify-between items-center">
          <div className="flex gap-2 items-center mb-4">
            <input type="text" placeholder="search for products..." onChange={(e) => setSearchVal(e.target.value)} className="bg-[#1E1E1E] text-[#D7CCC8] p-2 rounded-md focus:outline-none focus:bg-[#2C2C2C] w-full" />
            <button onClick={fetchProducts} className="bg-[#FFB74D] py-2 px-4 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]">Search</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {["all", "coffee", "tea", "cold_brews", "baked_items", "savory_bites", "desserts", "healthy_picks"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedcategory(cat)}
                className={`px-3 py-1 rounded-full border ${selectedCategory === cat ? 'bg-[#D7CCC8] text-black' : 'bg-transparent text-[#D7CCC8] border-[#D7CCC8]'}`}
              >
                {cat.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 md:p-4">
            {
              filteredProducts.map((prod) => (
                <div key={prod._id} className="bg-[#3E2723] p-4 flex flex-col rounded shadow-md">
                  <img src={prod.imgUrl} alt="" className="h-42 w-full object-fill rounded" />
                  <h3 className="text-[#D7CCC8] text-xl capitalize font-bold mt-2">{prod.productName}</h3>
                  <p className="text-[#D7CCC8]">{prod.description}</p>
                  <h4 className="text-[#D7CCC8]">₹ {prod.price}</h4>
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(prod)} className="bg-[#FFB74D] py-1 px-2 mt-2 md:text-lg text-sm rounded cursor-pointer hover:bg-[#e68c32] duration-300 text-[#121212] font-bold">Edit</button>
                    <button onClick={() => handleDelete(prod._id)} className="bg-red-500 py-1 px-2 mt-2 md:text-lg text-sm rounded cursor-pointer hover:bg-red-700 duration-300 text-[#121212] font-bold">Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="flex gap-4 items-center mt-4 text-sm">
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
