import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const fetchFeatured = async () => {
    try {
      const res = await axios.get(`${API}/api/menu/featured`);
      setMenuItems(res.data.result);
    } catch (error) {
      console.log("Error fetching featured products", error);
    }
  };
  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <section className='py-12 px-4 bg-[#3E2723]'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center text-[#D7CCC8]'>Our Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {menuItems.map((item) => (
            <div key={item._id} className='rounded-lg overflow-hidden shadow-md transition-all hover:scale-[1.02] duration-300 hover:shadow-lg bg-[#F5EBE0] border-1 border-[#E3D5CA]'>
              <div className='h-48 flex items-center justify-center bg-[#D6CCC2]'>
                <img src={item.imgUrl} alt="" className='h-full w-full object-fill' />
              </div>
              <div className='p-6'>
                <div className='flex justify-center gap-2 items-center'>
                  <h3 className='text-xl font-semibold text-[#5A4D41]'>{item.name}</h3>
                  <p className='text-xl font-bold text-[#A37B67]'>
                    ₹{item.price}
                  </p>
                </div>
                <p className='mt-1 text-sm text-[#8B6B5E]'>
                  {item.subcategory}
                </p>
                <p className='mt-3 text-[#8B6B5E]'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {menuItems.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-xl text-[#8B6B5E]'>
              No items found in this category
            </p>
          </div>
        )}
        <div className='flex justify-center items-center'>
          <button onClick={() => {navigate("/menu")}} className="bg-transparent mt-8 border-2 border-[#FFB74D] text-[#FFB74D] py-2 px-4 rounded-4xl cursor-pointer hover:bg-[#FFB74D] hover:text-[#121212] duration-300">
              Full Menu
          </button>
        </div>
      </div>
    </section>
  )
}

export default MenuSection
