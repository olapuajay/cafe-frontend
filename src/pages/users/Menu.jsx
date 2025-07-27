import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const API = import.meta.env.VITE_API_URL;
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    { id: 'all', name: 'All', emoji: '🍽️' },
    { id: 'coffee', name: 'Coffee', emoji: '☕' },
    { id: 'tea', name: 'Tea', emoji: '🍵' },
    { id: 'baked_items', name: 'Baked Goods', emoji: '🍰' },
    { id: 'savory_bites', name: 'Savory', emoji: '🥪' },
    { id: 'desserts', name: 'Desserts', emoji: '🧁' },
    { id: 'healthy_picks', name: 'Healthy', emoji: '🥗' }
  ];
  const filteredItems = activeCategory === "all" ? menus : menus.filter(item => item.category === activeCategory);
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API}/api/menu`);
      setMenus(res.data.result);
      setError('');
    } catch (error) {
      console.log(error);
      setError('Failed to fetch the menu items');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className='p-4'>
      <h2 className="text-[#D7CCC8] font-bold text-2xl">Menu</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}
      <div className='flex flex-wrap justify-center gap-3 mb-8'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-all ${activeCategory === category.id ? 'bg-[#A37B67] text-white' : 'bg-[#D6CCC2] text-[#5A4D41] hover:bg-[#E3D5CA]'}`}
          >
            <span className='mr-2 md:text-lg text-sm'>{category.emoji}</span>
            <p className='text-sm md:text-lg'>{category.name}</p>
            </button>
          ))}
        </div>
      {loading ? (
        <div className="text-center border-3 border-white h-12 w-12 rounded-full border-r-transparent border-t-transparent animate-spin p-4"></div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-4 justify-center items-center'>
          {filteredItems.map((menu) => (
            <div key={menu._id} className='rounded-lg overflow-hidden shadow-md transition-all hover:scale-[1.02] duration-300 hover:shadow-lg bg-[#F5EBE0] border-1 border-[#E3D5CA] relative'>
              <div className='md:h-48 h-24 flex items-center justify-center bg-[#D6CCC2]'>
                <img src={menu.imgUrl} alt="" className='h-full w-full object-fill' />
                {menu.featured && (
                  <p className='absolute top-2 left-2 text-sm'>⭐</p>
                )}
              </div>
              <div className='md:p-6 p-2'>
                <div className='flex justify-center gap-2 items-center'>
                  <h3 className='text-md md:text-xl font-semibold text-[#5A4D41]'>{menu.name}</h3>
                  <p className='text-md md:text-xl font-bold text-[#A37B67]'>
                    ₹{menu.price}
                  </p>
                </div>
                <p className='mt-1 text-sm text-[#8B6B5E]'>
                  {menu.subcategory}
                </p>
                <p className='mt-3 text-[#8B6B5E] text-sm md:text-md'>
                  {menu.description}
                </p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className='py-12'>
              <p className='text-xl text-[#8B6B5E]'>
                No items found in this category
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Menu
