import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    { id: 'all', name: 'All', emoji: '🍽️' },
    { id: 'packed_goods', name: 'Packed Items', emoji: '🍫' },
    { id: 'baked_items', name: 'Baked Goods', emoji: '🍰' },
    { id: 'savory_bites', name: 'Savory', emoji: '🥪' },
    { id: 'desserts', name: 'Desserts', emoji: '🧁' },
    { id: 'healthy_picks', name: 'Healthy', emoji: '🥗' }
  ];
  const filteredItems = activeCategory === "all" ? products : products.filter(item => item.category === activeCategory);

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
    if (found) {
      const updatedCart = cart.map((item) => (
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      ));
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  }
  return (
    <div className="p-4">
      {error && (
        <div className="text-red-500 text-center mt-10">{error}</div>
      )}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-all ${activeCategory === category.id ? 'bg-[#A37B67] text-white' : 'bg-[#D6CCC2] text-[#5A4D41] hover:bg-[#E3D5CA]'}`}
          >
            <span className="mr-2 md:text-lg text-sm">{category.emoji}</span>
            <p className="text-sm md:text-lg">{category.name}</p>
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center border-3 border-white h-12 w-12 rounded-full border-r-transparent border-t-transparent animate-spin"></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-4">
          {filteredItems.map((product) => (
              <div
                key={product._id}
                className="md:p-4 p-2 flex flex-col rounded bg-[#3E2723] shadow-md cursor-pointer"
                onClick={() => handleCardClick(product._id)}
              >
                <img
                  src={product.imgUrl}
                  alt={product.productName}
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
                  onClick={(e) => {e.stopPropagation(); addToCart(product)}}
                  className="bg-[#FFB74D] py-1 mt-2 md:text-lg text-sm rounded cursor-pointer hover:bg-[#e68c32] duration-300 text-[#121212] font-bold"
                >
                  {cart.find((item) => item._id === product._id) ? `Added (${cart.find((item) => item._id === product._id).qty})` : 'Add to Cart'}
                </button>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="py-12">
                <p className="text-xl text-[#8B6B5E]">No items found in this category</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
