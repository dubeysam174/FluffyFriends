import React from 'react'
import HeroSection from './landing/HeroSection'
import FeatureSection from './landing/FeaturesSection'
import ServicesSection from './landing/ServicesSection'
import PetCareTips from './landing/PetCareTips'
import Footer from './landing/Footer'
import HowItWorks from './landing/HowItWorks'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeatureSection/>
      {/* <ServicesSection/> */}
      <PetCareTips/>
      <HowItWorks/>
      <Footer/>
     
    </div>
  )
}

export default Home
