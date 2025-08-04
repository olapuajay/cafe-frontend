import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
import { ArrowLeft } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const { cart, setCart } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log("Failed to fetch products ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="h-8 w-8 border-4 border-t-transparent border-[#FFB74D] animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-[#D7CCC8] text-2xl bg-[#121212] h-screen flex flex-col justify-center items-center">
        Product not found
        <br />
        <button
          className="mt-4 px-4 py-2 bg-[#FFB74D] text-[#121212] font-semibold cursor-pointer hover:bg-[#e68c32] rounded shadow-md transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6 md:p-10">
      {/* Back Button */}
      <button
        className="text-[#121212] mb-6 px-4 py-2 bg-[#FFB74D] rounded flex items-center gap-2 cursor-pointer hover:bg-[#e68c32] duration-300 shadow-md"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-10 p-4 md:p-6 rounded-xl shadow-lg bg-[#1E1E1E]">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imgUrl}
            alt={product.productName}
            className="w-80 h-full md:w-96 md:h-96 object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2 flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide">
            {product.productName}
          </h2>
          <p className="text-[#D7CCC8] text-base leading-relaxed">{product.description}</p>
          <p className="text-xl md:text-2xl font-bold text-[#FFB74D]">${product.price}</p>
          <span className="text-md md:text-lg text-[#D7CCC8] bg-[#2C2C2C] px-2 py-1 rounded w-fit">
            {product.category}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#FFB74D] px-2 py-1 md:px-4 md:py-2 mt-4 md:mt-6 text-lg rounded cursor-pointer hover:bg-[#e68c32] transition duration-300 text-[#121212] font-bold shadow-md md:w-fit w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
