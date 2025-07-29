import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { user, cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  }
  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center border-3 border-white h-12 w-12 rounded-full border-r-transparent border-t-transparent animate-spin"></div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-4">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="md:p-4 p-2 flex flex-col rounded bg-[#3E2723] shadow-md"
                onClick={() => handleCardClick(product._id)}
              >
                <img
                  src={product.imgUrl}
                  className="md:h-42 h-20 w-full object-fill rounded"
                />
                <h3 className="text-white md:text-xl text-sm capitalize font-bold mt-2">
                  {product.productName}
                </h3>
                <p className="text-[#D7CCC8] md:text-sm text-[10px]">
                  {product.description}
                </p>
                <h4 className="text-[#D7CCC8]">₹ {product.price}</h4>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#FFB74D] py-1 mt-2 md:text-lg text-sm rounded cursor-pointer hover:bg-[#e68c32] duration-300 text-[#121212] font-bold"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
