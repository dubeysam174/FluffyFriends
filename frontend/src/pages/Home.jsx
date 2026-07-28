import React from 'react'
import HeroSection from './landing/HeroSection'
import FeatureSection from './landing/FeaturesSection'
import ServicesSection from './landing/ServicesSection'
import PetCareTips from './landing/PetCareTips'
import Footer from './landing/Footer'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeatureSection/>
      {/* <ServicesSection/> */}
      <PetCareTips/>
      <Footer/>
     
    </div>
  )
}

export default Home
