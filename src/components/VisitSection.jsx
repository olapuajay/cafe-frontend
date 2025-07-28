import React from 'react'
import { MapPin } from 'lucide-react'

function VisitSection() {
  return (
    <section id='contact' className='py-16 px-4 bg-[#121212]'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-4 text-[#D7CCC8]'>Visit Us</h2>
        <div className='mb-8 p-8 rounded-xl bg-[#3E2723] border-1 border-[#1E1E1E]'>
          <div className='flex flex-col md:flex-row justify-center gap-8'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold mb-4 text-[#FFB74D]'>Location</h3>
              <p className='text-[#D7CCC8]'>
                Building, Street Name<br />
                Locality, City<br />
                State, Pincode
              </p>
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold mb-4 text-[#FFB74D]'>Contact</h3>
              <p className='text-[#D7CCC8]'>
                support@devbean.cafe<br />
                (987) 654-3210
              </p>
            </div>
          </div>
        </div>
        <a href="#" className='inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:scale-105 bg-[#FFB74D] text-[#121212]'>
          View on Map <MapPin size={18} />
        </a>
      </div>
    </section>
  )
}

export default VisitSection
