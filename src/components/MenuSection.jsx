import React, { useState } from 'react'
import espresso from '../assets/espresso.webp';
import matcha_latte from '../assets/matcha_latte.jpg';
import croissant from '../assets/croissant.jpg';
import { useNavigate } from 'react-router-dom';

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: 'Espresso', price: 180, category: 'coffee', subcategory: 'Coffee', description: 'Rich and concentrated coffee', image: espresso },
    { id: 2, name: 'Matcha Latte', price: 240, category: 'tea', subcategory: 'Tea', description: 'Creamy matcha with steamed milk', image: matcha_latte },
    { id: 3, name: 'Croissant', price: 160, category: 'baked_items', subcategory: 'Pastries', description: 'Buttery flaky pastry', image: croissant },
  ];
  const categories = [
    { id: 'all', name: 'All Menu', emoji: '🍽️' },
    { id: 'coffee', name: 'Coffee', emoji: '☕' },
    { id: 'tea', name: 'Tea', emoji: '🍵' },
    { id: 'baked_items', name: 'Baked Goods', emoji: '🍰' },
    { id: 'savory_bites', name: 'Savory', emoji: '🥪' },
    { id: 'desserts', name: 'Desserts', emoji: '🧁' },
    { id: 'healthy_picks', name: 'Healthy', emoji: '🥗' }
  ];

  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className='py-12 px-4 bg-[#3E2723]'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center text-[#D7CCC8]'>Our Menu</h2>
        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${activeCategory === category.id ? 'bg-[#A37B67] text-white' : 'bg-[#D6CCC2] text-[#5A4D41] hover:bg-[#E3D5CA]'}`}
            >
              <span className='mr-2 text-lg'>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredItems.map((item) => (
            <div key={item.id} className='rounded-lg overflow-hidden shadow-md transition-all hover:scale-[1.02] duration-300 hover:shadow-lg bg-[#F5EBE0] border-1 border-[#E3D5CA]'>
              <div className='h-48 flex items-center justify-center bg-[#D6CCC2]'>
                <img src={item.image} alt="" className='h-full w-full object-fill' />
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
        {filteredItems.length === 0 && (
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
