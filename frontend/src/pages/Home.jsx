import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/slices/authSlice'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PetCareTips from '../components/landing/PetCareTips'
import Footer from '../components/landing/Footer'
import HowItWorks from '../components/landing/HowItWorks'
import PetOwnerDashboard from '../components/Home/PetDashboard'
import VetDashboard from '../components/Home/VetDashboard'

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-white">
      {!user ? (
        // NOT LOGGED IN - Show Landing Page
        <>
          <HeroSection />
          <FeaturesSection />
          <HowItWorks />
          <PetCareTips />
          <Footer />
        </>
      ) : user.role === 'petOwner' ? (
        // LOGGED IN AS PET OWNER
        <>
          <PetOwnerDashboard />
          
        </>
      ) : (
        // LOGGED IN AS VET
        <>
          <VetDashboard />
          
        </>
      )}
    </div>
  );
};

export default Home;