import React from 'react'
import HeroCarousel from './HeroCarousel'
import HeroFeature from './HeroFeature'
import Image from 'next/image'

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden">
        <div className="w-full">
          {/* Kelas padding bawah (pb-...) telah dihapus dari div di bawah ini */}
          <div className="relative z-1 rounded-[10px] pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5">
            <HeroCarousel />
          </div>
        </div>
      </section>

      <HeroFeature />
    </>
  )
}

export default Hero
