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
            {/* -- bg shapes -- */}
            <Image
              src="/images/hero/hero-bg.png"
              alt="hero bg shapes"
              className="absolute right-0 bottom-0 -z-1 object-contain"
              width={800}
              height={520}
            />

            <HeroCarousel />
          </div>
        </div>
      </section>

      <HeroFeature />
    </>
  )
}

export default Hero
