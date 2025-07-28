import React from 'react'
import { Instagram } from 'lucide-react'

function IgGallery() {
  const posts = [
    { id: 1, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Coffee+Shot", caption: 'Morning brew☕ #MidnightBrew', likes: "1.2k", link: "#" },
    { id: 2, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Cafe+Vibes", caption: 'Our cozy corner #CoffeeTime', likes: "896", link: "#" },
    { id: 3, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Latte+Art", caption: 'Today\'s special #LatteArt', likes: "2.2k", link: "#" },
    { id: 4, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Pastries", caption: 'Fresh from the oven #Bakery', likes: "1.8k", link: "#" },
    { id: 5, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Sunset+Brew", caption: 'Golden hour drinks #SunsetBrew', likes: "5.8k", link: "#" },
    { id: 6, imgUrl: "https://placehold.co/600x600/1E1E1E/D7CCC8?text=Barista+Life", caption: 'Behind the scenes #BaristaLife', likes: "2.4k", link: "#" },
  ];
  return (
    <section id='gallery' className='py-12 px-4 bg-[#3E2723]'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4 text-[#D7CCC8]'>
            FOLLOW US <span className='text-[#64FFDA]'>@DEVBEAN</span>
          </h2>
          <p className='text-lg text-[#D7CCC8] opacity-90'>
            Tag us in your coffee moments
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
          {posts.map((post) => (
            <a key={post.id} href={post.link} className='bg-[#121212] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={post.imgUrl} alt="" className='w-full h-36 object-cover' />
              <div className='p-3'>
                <div className='text-white font-medium mt-1'>{post.caption}</div>
                <div className='text-[#FFB74D] text-sm'>❤️ {post.likes} likes</div>
              </div>
            </a>
          ))}
        </div>
        <div className='text-center mt-8'>
          <a href="#" className='inline-flex items-center px-6 py-3 rounded-full font-bold transition-all hover:scale-105 bg-[#FFB74D] text-[#121212]'>
            Follow on Instagram <Instagram size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default IgGallery
