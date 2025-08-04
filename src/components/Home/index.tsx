import React from 'react'
import Hero from './Hero'
import JMarket from './JMarket'
import NewArrival from './NewArrivals'
import PromoBanner from './PromoBanner'
import BestSeller from './BestSeller'
import CounDown from './Countdown'
import Testimonials from './Testimonials'
import Sponsors from './Sponsor'
import Newsletter from '../Common/Newsletter'

const Home = () => {
  return (
    <main>
      <Hero />
      <JMarket />
      <NewArrival />
      {/* <PromoBanner /> */}
      <BestSeller />
      {/* <CounDown /> */}
      <Testimonials />
      <Sponsors />
      {/* <Newsletter /> */}
    </main>
  )
}

export default Home
