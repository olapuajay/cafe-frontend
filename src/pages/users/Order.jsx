import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.id;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(result.data)) {
        setOrders(result.data);
      } else {
        setOrders([]);
        setError(result.data?.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Navigate("/login");
      } else {
        setError("Something went wrong");
      }

      setOrders([]);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      Navigate("/login");
    } else {
      fetchOrders();
    }
  }, [user, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-bold text-[#D7CCC8] mb-8 border-b pb-2">
          My Orders
        </h3>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-6">{error}</div>
        )}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              You haven't placed any orders yet
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-[#3E2723] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-4 md:p-6 border-b border-[#5D4037]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-lg font-semibold">
                        Order #{order._id}
                      </h4>
                      <p className="text-sm text-[#D7CCC8]">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </div>
                      <p className="text-xl font-bold">₹{order.orderValue}</p>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#4E342E]">
                      <tr>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-center">Quantity</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-[#5D4037] hover:bg-[#4E342E]"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-[#5D4037] rounded mr-3 overflow-hidden">
                                {item.imgUrl && (
                                  <img
                                    src={item.imgUrl}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span>{item.productName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            ₹{item.price}
                          </td>
                          <td className="px-4 py-3 text-center">{item.qty}</td>
                          <td className="px-4 py-3 text-right font-medium">
                            ₹{item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
