import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([])
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="md:p-8 p-4 min-h-screen text-white">
      <h2 className="text-[#D7CCC8] font-bold text-2xl">My Cart</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Your cart is empty</p>
          <button onClick={() => Navigate("/")} className="mt-4 bg-[#3E2723] hover:bg-[#5D4037] text-white py-2 px-6 rounded">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          <div className="lg:col-span-2">
            {cart.map((value) => (
              <div key={value._id} className="flex flex-col sm:flex-row justify-between item-center p-4 bg-[#3E2723] rounded-lg mb-4 transition-all">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-16 h-16 bg-[#5D4037] rounded mr-4 overflow-hidden">
                    {value.image && (
                      <img src={value.image} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{value.productName}</h3>
                    <p className="text-[#D7CCC8]">₹{value.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-6">
                    <button
                      onClick={() => decrement(value._id, value.qty)}
                      className={`w-8 h-8 rounded-full font-bold flex items-center justify-center ${value.qty === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#FFB74D] hover:bg-[#e68c32]'}`}
                      disabled={value.qty === 1}
                    >-</button>
                    <span className="mx-4 w-6 text-center">{value.qty}</span>
                    <button
                      onClick={() => increment(value._id, value.qty)}
                      className="w-8 h-8 rounded-full bg-[#FFB74D] hover:bg-[#e68c32] flex items-center justify-center font-bold"
                    >+</button>
                  </div>
                  <div className="text-right mr-4 sm:mr-8">
                    <p className="font-bold text-[#D7CCC8]">₹{(value.price * value.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#3E2723] p-6 rounde-lg h-fit sticky top-4">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[#D7CCC8]">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{orderValue}</span>
              </div>
              <div className="flex justify-between text-[#D7CCC8]">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span>₹{orderValue}</span>
              </div>
            </div>

            {user?.token ? (
              <button onClick={placeOrder} className="w-full bg-[#FFB74D] hover:bg-[#e68c32] text-[#3E2723] font-bold py-3 px-4 rounded transition-colors">Place Order</button>
            ) : (
              <button onClick={() => Navigate("/login")}>Login to Order</button>
            )}
          </div>
        </div>

      )}
      {/* {cart && cart.map((value) => (
        <div key={value._id} className="p-2 flex gap-4 items-center bg-[#3E2723] rounded mb-4">
          <p>{value.productName}</p>
          <p>{value.price}</p>
          <button onClick={() => decrement(value._id, value.qty)}>-</button>
          <p>{value.qty}</p>
          <button onClick={() => increment(value._id, value.qty)}>+</button>
          <p>{value.price * value.qty}</p>
        </div>
      ))}
      <h4>Total Items: {cart.length}</h4> 
      <h5>Order Value:{orderValue}</h5>
      <p>
        {user?.token ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p> */}
    </div>
  );
}
