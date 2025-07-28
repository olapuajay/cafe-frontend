import React, { useState } from 'react'
import caramel_latte from '../assets/caramel_latte.jpg';
import blueberry_muffins from '../assets/blueberry_muffins.jpg';
import avocado_toast from '../assets/avocado_toast.jpg';
import iced_matcha from '../assets/iced_matcha.jpg';
import { Star } from 'lucide-react';

function BestSellersSection() {
  const bestsellers = [
    { id: 1, name: "Caramel Latte", price: 190, category: 'coffee', rating: 4.9, description: "Espresso with steamed milk and caramel syrup.", isNew: true, image: caramel_latte },
    { id: 2, name: "Blueberry Muffin", price: 150, category: 'baked', rating: 4.8, description: "Freshly baked with juicy blueberries", isNew: false, image: blueberry_muffins },
    { id: 3, name: "Avacado Toast ", price: 200, category: 'breakfast', rating: 4.6, description: "Sourdough with smashed avocado and spices", isNew: true, image: avocado_toast },
    { id: 4, name: "Iced Matcha", price: 270, category: 'tea', rating: 4.4, description: "Refreshing green tea with milk and ice", isNew: true, image: iced_matcha },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'tea', name: 'Tea' },
    { id: 'baked', name: 'Baked Goods' },
    { id: 'breakfast', name: 'Breakfast' }
  ];

  return (
    <section id='bestsellers' className='py-16 px-4 bg-[#121212]'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4 text-[#D7CCC8]'>Customer Favourites</h2>
          <p className='text-lg text-[#D7CCC8]'>Most loved items this month</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {bestsellers.map((item) => (
            <div key={item.id} className='rounded-lg overflow-hidden shadow-md transition-all hover:scale-[1.02] duration-300 hover:shadow-lg bg-[#3E2723] border-1 border-[#3E2723]'>
              <div className='h-48 flex items-center justify-center'>
                <img src={item.image} alt="" className='h-full w-full object-fill' />
              </div>
              <div className='p-6'>
                <div className='flex justify-center gap-2 items-center'>
                  <h3 className='text-lg font-bold text-[#D7CCC8]'>{item.name}</h3>
                  <p className='text-xl font-bold text-[#FFB74D]'>₹{item.price}</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <Star size={18} className='text-yellow-400' />
                  <p className='text-sm text-[#D7CCC8]'>{item.rating}</p>
                </div>
                <p className='text-[#D7CCC8]'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellersSection
