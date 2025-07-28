import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer className='w-full py-12 px-4 bg-[#121212]'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          <div>
            <h3 className='text-lg md:text-xl font-bold mb-4 text-[#FFB74D]'>Quick Links</h3>
            <ul className='space-y-2'>
              {[
                { name: 'Menu', path: '/menu' },
                { name: 'About', path: '#about' },
                { name: 'Contact', path: '#contact' },
                { name: 'Gallery', path: '#gallery' },
                { name: 'Best Sellers', path: '#bestsellers' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className='hover:text-[#e68c32] text-[#D7CCC8] transition-colors text-sm md:text-md'>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md md:text-xl font-bold mb-4 text-[#FFB74D]">Hours</h3>
            <ul className="space-y-2 text-[#D7CCC8] text-sm md:text-md">
              <li className="flex justify-between">
                <span>Mon-Thu:</span>
                <span>7am-11pm</span>
              </li>
              <li className="flex justify-between">
                <span>Fri:</span>
                <span>7am-1am</span>
              </li>
              <li className="flex justify-between">
                <span>Sat:</span>
                <span>8am-1am</span>
              </li>
              <li className="flex justify-between">
                <span>Sun:</span>
                <span>8am-10pm</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md md:text-xl font-bold mb-4 text-[#FFB74D]">Contact</h3>
            <address className="not-italic space-y-2 text-[#D7CCC8] text-sm md:text-md">
              <p>Dev Bean</p>
              <p>City, Pincode</p>
              <p>
                <a href="tel:+919876543210" className="hover:text-[#64FFDA] transition-colors">
                  (987) 654-3210
                </a>
              </p>
              <p>
                <a href="mailto:support@devbean.cafe" className="hover:text-[#64FFDA] transition-colors">
                  support@devbean.cafe
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className='text-md md:text-xl font-bold mb-4 text-[#FFB74D]'>Newsletter</h3>
            <p className='mb-4 text-[#D7CCC8] text-sm md:text-md'>Subscribe for exclusive offers</p>
            <form action="#" className='flex'>
              <input type="email" placeholder='your email' className='py-2 px-4 rounded-l bg-[#3E2723] text-[#D7CCC8] focus:outline-none' required />
              <button type='submit' className='px-4 py-2 rounded-r font-medium bg-[#FFB74D] text-[#121212]'>Join</button>
            </form>
          </div>
        </div>
        <div className='pt-8 border-t border-[#3E2723] flex flex-col md:flex-row justify-between items-center'>
          <div className='flex space-x-4 mb-4 md:mb-0'>
            {[
              { icon: <Instagram size={20} />, url: '#' },
              { icon: <Facebook size={20} />, url: '#' },
              { icon: <Twitter size={20} />, url: '#' },
            ].map((social, index) => (
              <a key={index} href={social.url} className='p-2 rounded-full hover:bg-[#3E2723] transition-colors text-[#D7CCC8]' aria-label={`${social.icon.type.name} social link`}>
                {social.icon}
              </a>
            ))}
          </div>
          <div className='text-center md:text-right text-[#D7CCC8]'>
            <p>&copy; {new Date().getFullYear()} Dev Bean. all rights reserved.</p>
            <div className='flex justify-center md:justify-end space-x-4 mt-2 text-sm'>
              <a href="#" className='hover:text-[#64FFDA] transition-colors'>Privacy Policy</a>
              <a href="#" className='hover:text-[#64FFDA] transition-colors'>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
