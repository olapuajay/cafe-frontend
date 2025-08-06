import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
import { ArrowLeft } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const { user, cart, setCart } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/products/${id}/review`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = await axios.get(`${API}/api/products/${id}`);
      setProduct(updated.data);
      setReviews(updated.data.reviews);
    } catch (error) {
      console.log("Failed to submit review", error);
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/api/products/${id}`);
        setProduct(res.data);
        setReviews(res.data.reviews || []);

        const relatedRes = await axios.get(`${API}/api/products/category?category=${res.data.category}`);
        const filteredProducts = relatedRes.data.filter((p) => p._id !== id);
        setRelatedProducts(filteredProducts);
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

  const currentUserId = user?._id;
  const existingReview = reviews.find((rev) => rev.user === currentUserId);

  useEffect(() => {
    if(existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    } else {
      setRating(0);
      setComment("");
    }
  }, [existingReview]);

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
    <div className="bg-[#121212] text-white min-h-screen p-4 md:p-10">
      <button
        className="text-[#121212] mb-6 px-4 py-2 bg-[#FFB74D] rounded flex items-center gap-2 cursor-pointer hover:bg-[#e68c32] duration-300 shadow-md"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-10 p-4 md:p-6 rounded-xl shadow-lg bg-[#1E1E1E]">
        <div className="flex justify-center items-center">
          <img
            src={product.imgUrl}
            alt={product.productName}
            className="w-80 h-full md:w-96 md:h-96 object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-2 flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide">
            {product.productName}
          </h2>
          <p className="text-[#D7CCC8] text-base leading-relaxed">{product.description}</p>
          <p className="text-xl md:text-2xl font-bold text-[#FFB74D]">₹ {product.price}</p>
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
      <div className='mt-10 bg-[#1E1E1E] p-4 rounded-lg'>
        <h3 className='text-2xl font-bold mb-4'>Customer Reviews</h3>
        {reviews.length === 0 && <p className="text-[#D7CCC8]">No reviews yet</p>}
        {reviews.map((rev) => (
          <div key={rev._id} className='border-b border-[#2C2C2C] py-2'>
            <p className='text-[#FFB74D]'>⭐ {rev.rating}</p>
            <p className="font-bold">{rev.name}</p>
            <p className="text-sm text-[#D7CCC8]">{rev.comment}</p>
          </div>
        ))}
        <div className='mt-4'>
          <h4 className='text-lg font-semibold mb-2'>{existingReview ? 'Edit your Review' : 'Write a Review'}</h4>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className='bg-[#2C2C2C] text-white p-2 rounded w-full mb-2'>
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write your review...'
            className="bg-[#2C2C2C] text-white p-2 rounded w-full mb-2"
          ></textarea>
          <button onClick={submitReview} className='bg-[#FFB74D] px-4 py-2 rounded cursor-pointer hover:bg-[#e68c32] text-[#121212] font-bold'>
            {existingReview ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className='mt-10'>
          <h3 className='text-2xl font-bold mb-4'>Related Products</h3>
          <div className='flex gap-4 overflow-x-auto scrollbar-hide p-2'>
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className='min-w-[200px] bg-[#121212] p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transition'
              >
                <img
                  src={item.imgUrl}
                  alt={item.productName}
                  className="w-full h-40 object-contain rounded-lg"
                />
                <p className="mt-2 text-lg font-semibold">{item.productName}</p>
                <p className="text-[#FFB74D] font-bold">₹ {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
