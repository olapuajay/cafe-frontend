import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useFetcher } from "react-router-dom";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
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
        {/* <button>Show</button> */}
      </div>
      {orders &&
        orders.map((order, index) => (
          <div key={index} className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="md:p-6 p-2 text-white flex flex-col gap-2 max-w-sm bg-[#3E2723] rounded-md">
              <p>
                <strong>ID: </strong>
                {order._id}
              </p>
              <p>
                <strong>Value: </strong>
                {order.orderValue}
              </p>
              <p>
                <strong>Status: </strong>
                {order.status}
              </p>
              <>
                {order.status === "Pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => updateOrder("cancelled", order._id)}
                      className="bg-[#FFB74D] py-1 px-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateOrder("completed", order._id)}
                      className="bg-[#FFB74D] py-1 px-2 rounded-md text-[#121212] cursor-pointer hover:bg-[#e68c32]"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        ))}
    </div>
  );
}
