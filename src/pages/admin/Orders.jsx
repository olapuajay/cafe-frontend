import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useFetcher } from "react-router-dom";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [status]);
  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      const result = await axios.patch(url, { status }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="text-white flex flex-col gap-4 md:p-6 p-2">
      <h2 className="text-[#D7CCC8] font-bold text-2xl">Order Management</h2>
      <div>
        <select
          defaultValue="Pending"
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded text-[#D7CCC8] bg-[#3E2723]"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4 bg-[#3E2723] rounded-md"
        >
          <div>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Value:</strong> ₹{order.orderValue}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>User:</strong> {order.email}</p>

            {order.status === "Pending" && (
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => updateOrder("cancelled", order._id)}
                  className="bg-[#FFB74D] py-1 px-2 rounded-md text-[#121212] hover:bg-[#e68c32]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateOrder("completed", order._id)}
                  className="bg-[#FFB74D] py-1 px-2 rounded-md text-[#121212] hover:bg-[#e68c32]"
                >
                  Complete
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <strong>Products:</strong>
            {order.items?.map((item, idx) => (
              <div key={idx} className="border p-2 rounded bg-[#4E342E] flex md:flex-row flex-col">
                <div className="md:w-30 h-30 w-full bg-[#5D4037] rounded mr-3 overflow-hidden">
                  {item.imgUrl && (
                    <img
                      src={item.imgUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p><strong>Name:</strong> {item.productName}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
