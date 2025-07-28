import React from 'react'
import HeroSection from '../components/HeroSection'
import MenuSection from '../components/MenuSection'
import BestSellersSection from '../components/BestSellersSection'
import AboutSection from '../components/AboutSection'
import VisitSection from '../components/VisitSection'
import IgGallery from '../components/IgGallery'
import Footer from '../components/Footer'

function Home() {
  return (  
    <div className=''>
      <HeroSection />
      <MenuSection />
      <BestSellersSection />
      <AboutSection />
      <VisitSection />
      <IgGallery />
      <Footer />
    </div>
  )
}

export default Home
